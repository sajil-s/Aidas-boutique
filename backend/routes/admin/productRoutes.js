

import express from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  // deleteProduct (later)
} from "../../controllers/admin/productController.js";

import {
  protect,
  admin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Get all products
router.get(
  "/",
  protect,
  admin,
  getAllProducts
);

// Create product
router.post(
  "/",
  protect,
  admin,
  createProduct
);

// Update product
router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

export default router;