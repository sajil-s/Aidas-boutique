import express from "express";

import { toggleWhishlist,getWishlist } from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/:productId",protect,toggleWhishlist);
router.get("/",protect,getWishlist)



export default router;