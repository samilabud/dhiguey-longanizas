import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com" // ✅ Live API
    : "https://api-m.sandbox.paypal.com"; // 🛠️ Sandbox API
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL;

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
    const { price, description } = req.body;
    const accessToken = await generateAccessToken();
    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          { amount: { currency_code: "USD", value: price }, description },
        ],
        application_context: {
          return_url: `${BASE_URL}/success`, // ✅ Redirect here after payment success
          cancel_url: `${BASE_URL}/cancel`, // ❌ Redirect here if user cancels
          user_action: "PAY_NOW", // Forces immediate payment (optional)
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      orderID: data.id,
      link: data.links.find((l) => l.rel === "approve").href,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Capture Payment (On Success)
router.post("/capture-payment/:orderID", async (req, res) => {
  try {
    console.log({ orderID: req.params.orderID });
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

    res.json({ message: "Payment successful", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Node.js/Express: Check PayPal order status
router.get("/check-payment", async (req, res) => {
  try {
    // Replace with actual order verification logic
    const isPaid = true; // Check from database or PayPal API

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
