import express from "express";
import { supabase } from "../supabaseClient.js";
import productsContingence, {
  shippingOptions as shippingOptionsContingence,
} from "../data/products.js";

const router = express.Router();

// @desc   Get all products from Supabase
// @route  GET /api/products
router.get("/", async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (products.length === 0) {
      res.json(productsContingence);
      return;
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc   Get the shipping options from Supabase
// @route  GET /api/products/shipping_options
router.get("/shipping_options", async (req, res) => {
  try {
    const { data: shipping_options, error } = await supabase
      .from("shipping_options")
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (shipping_options.length === 0) {
      res.json(shippingOptionsContingence);
      return;
    }
    res.json(shipping_options);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
