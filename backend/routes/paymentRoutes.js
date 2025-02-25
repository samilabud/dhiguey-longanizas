import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import { supabase } from "../supabaseClient.js";
import sendInvoice from "../utils/sendInvoice.js";
import { convertDateToSpanishFormat } from "../utils/conversions.js";

dotenv.config();

const router = express.Router();

const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com" // ✅ Live API
    : "https://api-m.sandbox.paypal.com"; // 🛠️ Sandbox API
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL;

const confirmPayment = async (orderID) => {
  const { error: supabaseError, data } = await supabase
    .from("invoices")
    .select("*")
    .eq("order_id", orderID);

  if (supabaseError) {
    throw new Error(supabaseError.message);
  }

  const invoiceNumber = data[0].invoice_num;
  const orderCreationDate = convertDateToSpanishFormat(data[0].generation_date);
  const customerName = data[0].client_name;
  const customerPhone = data[0].client_phone;
  const clientEmail = data[0].client_email;
  const totalDOP = data[0].total_dop;
  const products = JSON.parse(data[0].products);

  if (!orderID || !invoiceNumber || !clientEmail || !totalDOP || !products) {
    throw new Error("Invalid invoice data");
  }

  const { error: updateError } = await supabase
    .from("invoices")
    .update({ status: "paid" })
    .eq("order_id", orderID);

  if (updateError) {
    console.log({ updateError });
    throw new Error(updateError.message);
  }

  await sendInvoice({
    invoiceNumber,
    issueDate: orderCreationDate,
    customerName,
    customerPhone,
    clientEmail,
    totalAmount: totalDOP,
    products,
  });
};
// Generate PayPal Access Token
const generateAccessToken = async () => {
  try {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );
    const { data } = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.access_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

// Create Payment Order
router.post("/create-payment", async (req, res) => {
  try {
    const {
      totalDOP,
      totalUSD,
      description,
      customerName,
      customerPhone,
      clientEmail,
      products,
    } = req.body;
    const accessToken = await generateAccessToken();

    const items = products.map((product) => ({
      name: product.name,
      unit_amount: {
        currency_code: "USD",
        value: product.price.toFixed(2),
      },
      quantity: product.quantity.toString(),
    }));

    const purchase_units = [
      {
        amount: {
          currency_code: "USD",
          value: totalUSD.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: totalUSD.toFixed(2),
            },
          },
        },
        items,
        description,
      },
    ];

    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units,
        application_context: {
          return_url: `${BASE_URL}/success`,
          cancel_url: `${BASE_URL}/cancel`,
          user_action: "PAY_NOW",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const currentTimestamp = Date.now();
    const invoiceNumber = `DHLM-${currentTimestamp}`;

    // Store in Supabase
    const { error: supabaseError } = await supabase.from("invoices").insert([
      {
        invoice_num: invoiceNumber,
        generation_date: new Date(currentTimestamp).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }
        ),
        order_id: data.id,
        client_name: customerName,
        client_phone: customerPhone,
        details: description,
        total_dop: totalDOP,
        total_usd: totalUSD,
        client_email: clientEmail,
        generated_by: "paypal",
        status: "pending",
        products: JSON.stringify(products),
      },
    ]);

    if (supabaseError) {
      console.log({ supabaseError });
      throw new Error(supabaseError.message);
    }

    // Update profiles in Supabase
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ phone: customerPhone })
      .eq("email", clientEmail);
    if (updateError) {
      console.error("Error updating profile:", updateError);
    }

    res.json({
      orderID: data.id,
      link: data.links.find((l) => l.rel === "approve").href,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
});

// Capture Payment (On Success)
router.post("/capture-payment/:orderID", async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const { orderID } = req.params;
    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    confirmPayment(orderID);
    res.json({ message: "Payment successful", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Node.js/Express: Check PayPal order status
router.get("/check-payment", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { error: supabaseError } = await supabase
      .from("invoices")
      .select("*")
      .eq("order_id", orderID);

    if (supabaseError) {
      console.log({ supabaseError });
      throw new Error(supabaseError.message);
    }

    const isPaid = supabaseError.data[0].status === "paid";
    if (isPaid) {
      res.json({ success: true, message: "Payment successful!" });
    } else {
      res.json({ success: false, message: "Payment not completed." });
    }
  } catch (err) {
    console.error("Error checking payment status:", err);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

export default router;
