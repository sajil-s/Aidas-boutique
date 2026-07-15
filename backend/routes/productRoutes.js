import express from "express";

import { getProducts,
    getProductById,getCategories
 } from "../controllers/productControllers.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router=express.Router();


router.get("/",getProducts);
router.get("/categories", getCategories);

router.get("/:id",getProductById);


export default router;