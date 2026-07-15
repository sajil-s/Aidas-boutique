import express from "express";

import  {registerUser,loginUser,logoutUser,getProfile,adminDashboard} from "../controllers/authControllers.js";
import { protect,admin } from '../middleware/authMiddleware.js';

const router =express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser)
router.get("/profile",protect,getProfile)
router.get("/admin",protect,admin,adminDashboard)

export default router;