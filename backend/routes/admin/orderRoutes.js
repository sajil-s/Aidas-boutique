import express from "express";

import {  getOrderById, getAllOrders,updateOrderStatus} from "../../controllers/admin/orderController.js";
import {
  protect,
  admin,
} from "../../middleware/authMiddleware.js";

const router=express.Router();

router.get("/",protect,admin,getAllOrders)
router.put("/:id/status",protect,admin,updateOrderStatus)
router.get(
  "/:id",
  protect,
  admin,
  getOrderById
);

export default router;