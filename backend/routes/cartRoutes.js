import express from "express";
import {
    addToCart, getCart, updateCartQuantity,
    removeCartItem
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.patch("/:itemId", protect, updateCartQuantity);
router.delete("/:itemId", protect, removeCartItem)

export default router     