import paypal from "../config/paypalConfig.js";

export const createPayment = (req, res) => {
  const { price, description } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    transactions: [{ amount: { currency: "USD", total: price }, description }],
    redirect_urls: {
      return_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) return res.status(500).json({ error });

    res.json({
      link: payment.links.find((l) => l.rel === "approval_url").href,
    });
  });
};
