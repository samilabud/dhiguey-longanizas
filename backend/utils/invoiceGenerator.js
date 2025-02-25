// utils/invoiceGenerator.js
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { supabase } from "../supabaseClient.js";

export const generateInvoicePDF = async (invoiceData) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const templatePath = path.join(process.cwd(), "templates", "invoice.html");
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");
  htmlTemplate = htmlTemplate
    .replace("{{invoiceNumber}}", invoiceData?.invoiceNumber || "-")
    .replace("{{issueDate}}", invoiceData?.issueDate || "-")
    .replace("{{customerName}}", invoiceData?.customerName || "-")
    .replace("{{customerPhone}}", invoiceData?.customerPhone || "-")
    .replace(
      "{{productsTable}}",
      invoiceData?.productsTable || "<tr><td>-</td><td>-</td><td>-</td></tr>"
    )
    .replace("{{totalAmount}}", invoiceData?.totalAmount?.toFixed(2) || "-");

  //Render the HTML content in Puppeteer
  await page.setContent(htmlTemplate, { waitUntil: "networkidle0" });

  //Generate the PDF
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", bottom: "20px" },
  });

  await browser.close();

  // Upload PDF to Supabase Storage
  const { data, error } = await supabase.storage
    .from("invoices")
    .upload(
      `dhiguey-longanizas-factura-${invoiceData.invoiceNumber}.pdf`,
      pdfBuffer,
      {
        contentType: "application/pdf",
        upsert: true, // Overwrite existing file
      }
    );

  if (error) {
    throw new Error("Error uploading invoice: " + error.message);
  }

  if (data) {
    console.log("Invoice uploaded successfully:", data);
    const { data: urlData, error: urlError } = supabase.storage
      .from("invoices")
      .getPublicUrl(data.path);

    if (urlError) {
      throw new Error("Error getting public URL: " + urlError.message);
    }

    const publicUrl = urlData.publicUrl;
    const { error: updateError } = await supabase
      .from("invoices")
      .update({ pdf_url: publicUrl })
      .eq("invoice_num", invoiceData.invoiceNumber);

    if (updateError) {
      throw new Error("Error updating invoice: " + updateError.message);
    }
    return publicUrl;
  }
};
