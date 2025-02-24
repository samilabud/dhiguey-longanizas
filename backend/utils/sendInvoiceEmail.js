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

export const sendInvoiceEmail = async (
  customerName,
  recipientEmail,
  invoiceURL
) => {
  const mailOptions = {
    from: `"D'Higüey Longanizas y Más" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    bcc: process.env.SMTP_USER,
    subject: "Su Factura de D'Higüey Longanizas y Más",
    html: `
          <p>Estimado(a) ${customerName},</p>
          <p>¡Gracias por su compra! Puede descargar su factura desde el siguiente enlace:</p>
          <a href="${invoiceURL}">Descargar Factura</a>
          <p>Atentamente,<br/>D'Higüey Longanizas y Más</p>
        `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Invoice email sent:", info.response);
  } catch (error) {
    console.error("Error sending invoice email:", error);
  }
};
