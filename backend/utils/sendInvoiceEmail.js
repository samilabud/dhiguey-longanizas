// utils/sendInvoiceEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendInvoiceEmail = async (recipientEmail, invoiceURL) => {
  const mailOptions = {
    from: `"D'Higüey Longanizas y Más" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    subject: "Your Invoice from D'Higüey Longanizas y Más",
    html: `
      <p>Dear Customer,</p>
      <p>Thank you for your purchase! You can download your invoice from the link below:</p>
      <a href="${invoiceURL}">Download Invoice</a>
      <p>Best regards,<br/>D'Higüey Longanizas y Más</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Invoice email sent:", info.response);
  } catch (error) {
    console.error("Error sending invoice email:", error);
  }
};
