import express from "express";

import { getAllUsers,getUserById,updateUserRole } from "../../controllers/admin/userController.js";

import {
  protect,
  admin,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  admin,
  getAllUsers
);

router.get(
  "/:id",
  protect,
  admin,
  getUserById
);

router.put(
  "/:id/role",
  protect,
  admin,
  updateUserRole
);

export default router;