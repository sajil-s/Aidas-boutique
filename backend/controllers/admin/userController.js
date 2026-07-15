import User from "../../models/User.js";
import Order from "../../models/Order.js";
import mongoose from "mongoose";



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({
          user: user._id,
        });

        const totalOrders = orders.length;

        const totalSpent = orders.reduce(
          (total, order) => total + order.finalPrice,
          0
        );

        return {
          ...user.toObject(),
          totalOrders,
          totalSpent,
        };
      })
    );

    res.status(200).json(usersWithStats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getUserById = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }



    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orders = await Order.find({
      user: user._id,
    }).sort({
      createdAt: -1,
    });

    const totalSpent = orders.reduce(
      (total, order) => total + order.finalPrice,
      0
    );

    res.status(200).json({
      user,
      totalOrders: orders.length,
      totalSpent,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (
  req.user._id.toString() === req.params.id &&
  role === "user"
) {
  return res.status(400).json({
    message: "You cannot remove your own admin role.",
  });
}

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      message: "Role updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  getAllUsers,getUserById,updateUserRole
};