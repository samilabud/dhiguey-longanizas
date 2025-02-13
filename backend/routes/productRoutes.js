import express from "express";
import products from "../data/products.js";

const router = express.Router();

// @desc   Get all products
// @route  GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

export default router;
