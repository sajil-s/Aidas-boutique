import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from"./routes/productRoutes.js"
import cookieParser from "cookie-parser"
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminProductRoutes from "./routes/admin/productRoutes.js";
import adminOrderRoutes from "./routes/admin/orderRoutes.js"
import adminUserRoutes from "./routes/admin/userRoutes.js";



dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
     credentials: true,
}))
app.use("/api/auth",authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin/orders",adminOrderRoutes);
app.use(
  "/api/admin/users",
  adminUserRoutes
);





app.get("/", (req, res) => {
    res.send("Aidas api running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on PORT:${PORT}`);
    
})