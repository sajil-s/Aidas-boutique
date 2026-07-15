import Order from "../../models/Order.js";
import mongoose from "mongoose";

  const getAllOrders =
  async (req, res) => {
    try {
      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        orders
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const updateOrderStatus =
  async (req, res) => {
    try {
      const {
        orderStatus,
        trackingNumber,
      } = req.body;

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      order.orderStatus =
        orderStatus ??
        order.orderStatus;

      order.trackingNumber =
        trackingNumber ??
        order.trackingNumber;

      if (
        orderStatus ===
        "shipped"
      ) {
        order.shippedAt =
          new Date();
      }

      if (
        orderStatus ===
        "delivered"
      ) {
        order.deliveredAt =
          new Date();
      }

      await order.save();

      res.status(200).json({
        message:
          "Order updated",
        order,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


  const getOrderById = async (req, res) => {
  try {


 if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export { getAllOrders,updateOrderStatus,getOrderById }