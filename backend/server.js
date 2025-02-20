import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import paymentRoutes from "./routes/paymentRoutes.js";
import paymentRoutesWebhook from "./routes/paymentRoutesWebhook.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/paypal", paymentRoutes);
app.use("/webhook/", paymentRoutesWebhook);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
