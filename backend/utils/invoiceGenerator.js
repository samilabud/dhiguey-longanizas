// utils/invoiceGenerator.js
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { supabase } from "../supabaseClient.js";

export const generateInvoicePDF = async (invoiceData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  page.drawText("Invoice", {
    x: 50,
    y: 350,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Customer: ${invoiceData.customerName}`, {
    x: 50,
    y: 300,
    size: 18,
    font,
  });

  page.drawText(`Amount: $${invoiceData.amount}`, {
    x: 50,
    y: 270,
    size: 18,
    font,
  });

  page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
    x: 50,
    y: 240,
    size: 18,
    font,
  });

  const pdfBytes = await pdfDoc.save();
  //   uploadFileToStorage(pdfBytes, "invoice.pdf");
  //   return pdfBytes;
  // Upload PDF to Supabase Storage
  const { data, error } = await supabase.storage
    .from("invoices")
    .upload(`invoice_${Date.now()}.pdf`, pdfBytes, {
      contentType: "application/pdf",
    });

  if (error) throw new Error("Error uploading invoice: " + error.message);
  if (data) {
    console.log(data);
    return data.Key;
  }

  //   // Get public URL of the uploaded file
  //   const { publicURL } = supabase.storage
  //     .from("invoices")
  //     .getPublicUrl(data.path);
  //   return publicURL;
};
