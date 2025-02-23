// sendInvoice.js
import { generateInvoicePDF } from "./utils/invoiceGenerator.js";
import { sendInvoiceEmail } from "./utils/sendInvoiceEmail.js";

const handleInvoice = async () => {
  const invoiceData = {
    customerName: "Daniel Perez",
    amount: 120.99,
  };

  try {
    // Generate PDF and upload to Supabase
    const invoiceURL = await generateInvoicePDF(invoiceData);

    // Send invoice by email using Nodemailer
    await sendInvoiceEmail("samilabud@gmail.com", invoiceURL);
    console.log("Invoice generated and email sent.");
  } catch (error) {
    console.error("Error handling invoice:", error);
  }
};

handleInvoice();
