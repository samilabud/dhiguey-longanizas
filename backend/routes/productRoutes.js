import express from "express";
import { supabase } from "../supabaseClient.js";
import productsContingence from "../data/products.js";

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
    console.log({ products });
    if (products.length === 0) {
      res.json(productsContingence);
      return;
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
