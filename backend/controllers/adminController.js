import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const getDashboardStats = async (req, res) => {
  try {
    // Count documents
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Get all paid orders
    const paidOrders = await Order.find({ isPaid: true });

    // Calculate total revenue
    const totalRevenue = paidOrders.reduce(
      (sum, order) => sum + order.finalPrice,
      0
    );

    // Latest 5 orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    // Products having at least one low-stock variant
    const lowStockProducts = await Product.find({
      variants: {
        $elemMatch: {
          stock: { $lt: 5 },
        },
      },
    }).select("title variants");

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { getDashboardStats };