import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com" // ✅ Live API
    : "https://api-m.sandbox.paypal.com"; // 🛠️ Sandbox API
// const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

// Webhook listener route
router.post("/paypal", async (req, res) => {
  try {
    console.log({ req });
    const paypalTransmissionId = req.headers["paypal-transmission-id"];
    const paypalTimestamp = req.headers["paypal-transmission-time"];
    const paypalWebhookId = req.headers["paypal-webhook-id"];
    const paypalSignature = req.headers["paypal-transmission-sig"];
    const paypalCertUrl = req.headers["paypal-cert-url"];

    const rawBody = JSON.stringify(req.body);

    // Validate webhook signature (Optional but recommended)
    const isValid = await validateWebhookSignature(
      rawBody,
      paypalTransmissionId,
      paypalTimestamp,
      paypalWebhookId,
      paypalSignature,
      paypalCertUrl
    );

    if (!isValid) {
      console.error("Invalid webhook signature");
      return res.status(400).send("Invalid signature");
    }

    // Process the event
    const eventType = req.body.event_type;
    console.log("Received PayPal webhook event:", eventType);

    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      const paymentDetails = req.body.resource;
      console.log("Payment Completed:", paymentDetails);
      // TODO: Update database, send email, etc.
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Webhook processing failed");
  }
});

// Validate PayPal webhook signature
const validateWebhookSignature = async (
  rawBody,
  transmissionId,
  timestamp,
  webhookId,
  signature,
  certUrl
) => {
  try {
    const response = await fetch(
      `${PAYPAL_API}/v1/notifications/verify-webhook-signature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          auth_algo: "SHA256",
          transmission_id: transmissionId,
          transmission_time: timestamp,
          cert_url: certUrl,
          webhook_id: webhookId,
          event_body: rawBody,
          transmission_sig: signature,
        }),
      }
    );

    const result = await response.json();
    return result.verification_status === "SUCCESS";
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return false;
  }
};

export default router;
