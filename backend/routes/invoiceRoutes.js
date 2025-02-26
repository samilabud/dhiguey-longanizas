import dotenv from "dotenv";
import express from "express";
import { supabase } from "../supabaseClient.js";
import { generateInvoicePDF } from "../utils/invoiceGenerator.js";
import { convertDateToSpanishFormat } from "../utils/conversions.js";

dotenv.config();

const router = express.Router();

// Create Manual Invoice
router.post("/create-manual", async (req, res) => {
  try {
    const {
      customerName,
      clientEmail,
      customerPhone,
      products,
      totalDOP,
      description,
    } = req.body;

    const currentTimestamp = Date.now();
    const invoiceNumber = `DHLM-${currentTimestamp}`;
    const issueDate = convertDateToSpanishFormat(currentTimestamp);

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
        order_id: invoiceNumber,
        client_name: customerName,
        client_phone: customerPhone,
        details: description,
        total_dop: totalDOP,
        total_usd: 0,
        client_email: clientEmail,
        generated_by: "manual_invoice",
        status: "pending",
        products: JSON.stringify(products),
      },
    ]);

    if (supabaseError) {
      console.log({ supabaseError });
      throw new Error(supabaseError.message);
    }

    const productsTable = products
      .map(
        (product) => `
        <tr>
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td>RD$ ${product.price_dop.toFixed(2)}</td>
        </tr>`
      )
      .join("");

    const invoiceData = {
      invoiceNumber,
      issueDate,
      customerName,
      customerPhone,
      productsTable,
      totalAmount: totalDOP,
    };

    try {
      // Generate PDF and upload to Supabase
      const invoiceURL = await generateInvoicePDF(invoiceData);
      res.json({ invoiceURL });
    } catch (error) {
      console.error("Error handling invoice:", error);
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
});

export default router;
