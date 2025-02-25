import { generateInvoicePDF } from "./invoiceGenerator.js";
import { sendInvoiceEmail } from "./sendInvoiceEmail.js";

const sendInvoice = async ({
  invoiceNumber,
  issueDate,
  customerName,
  customerPhone,
  clientEmail,
  totalAmount,
  products,
}) => {
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
    totalAmount,
  };

  try {
    // Generate PDF and upload to Supabase
    const invoiceURL = await generateInvoicePDF(invoiceData);

    // Send invoice by email using Nodemailer
    await sendInvoiceEmail(customerName, clientEmail, invoiceURL);
    console.log(
      `Invoice generated and email sent. email: ${clientEmail}, url: ${invoiceURL}`
    );
  } catch (error) {
    console.error("Error handling invoice:", error);
  }
};

export default sendInvoice;
