import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import paymentRoutesWebhook from "./routes/paymentRoutesWebhook.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// Enable CORS only for your front‑end origins
app.use(
  cors({
    origin: process.env.FRONTEND_URL.split(","),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Core Helmet protections
app.use(helmet());

// Customize HSTS (force HTTPS)
app.use(
  helmet.hsts({
    maxAge: 60 * 60 * 24 * 365, // one year in seconds
    includeSubDomains: true,
    preload: true,
  })
);

// Prevent MIME‑type sniffing
app.use(helmet.noSniff());

// Clickjacking protection
app.use(helmet.frameguard({ action: "deny" }));

// XSS filter (older browsers)
app.use(helmet.xssFilter());

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://www.paypal.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Referrer policy
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

// Remove X-Powered-By
app.use(helmet.hidePoweredBy());

// --- routes ---
app.use("/api/paypal", paymentRoutes);
app.use("/webhook/", paymentRoutesWebhook);
app.use("/api/products", productRoutes);
app.use("/invoices", invoiceRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
