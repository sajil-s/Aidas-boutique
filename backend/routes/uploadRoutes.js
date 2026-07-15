import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImages } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  admin,
  upload.array("images", 5),
  uploadImages
);

export default router;