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
      .select("*")
      .order("id");

    // Supabase error or no rows → return fallback
    if (error) {
      console.error("Supabase error fetching products:", error.message);
      return res.status(200).json(productsContingence);
    }
    if (!products || products.length === 0) {
      console.warn("No products found in Supabase, using contingence data.");
      return res.status(200).json(productsContingence);
    }

    // All good → return live data
    return res.status(200).json(products);
  } catch (err) {
    console.error("Unexpected error in /api/products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc   Get the shipping options from Supabase
// @route  GET /api/products/shipping_options
router.get("/shipping_options", async (req, res) => {
  try {
    const { data: shipping_options, error } = await supabase
      .from("shipping_options")
      .select("*")
      .order("id");

    if (error) {
      console.error("Supabase error fetching shipping options:", error.message);
      return res.status(200).json(shippingOptionsContingence);
    }
    if (!options || options.length === 0) {
      console.warn(
        "No shipping options found in Supabase, using contingence data."
      );
      return res.status(200).json(shippingOptionsContingence);
    }

    return res.status(200).json(options);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Add a new product
router.post("/", async (req, res) => {
  const {
    name,
    description,
    price_dop,
    price_usd,
    price_cash,
    images,
    available,
    selling_by,
  } = req.body;

  try {
    const { data, error } = await supabase.from("products").insert([
      {
        name,
        description,
        price_dop,
        price_usd,
        price_cash,
        images,
        available,
        selling_by,
      },
    ]);

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Update a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price_dop,
    price_usd,
    price_cash,
    images,
    available,
    selling_by,
  } = req.body;

  try {
    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        description,
        price_dop,
        price_usd,
        price_cash,
        images,
        available,
        selling_by,
      })
      .eq("id", id);
    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
