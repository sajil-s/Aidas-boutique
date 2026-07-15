import Order from "../models/Order.js";

import Payment from "../models/Payment.js";

import razorpay from "../config/razorpay.js";

import crypto from "crypto";
import User from "../models/User.js";
import Product from "../models/Product.js";

const createRazorpayOrder =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.orderId
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      const options = {
        amount:
          order.finalPrice *
          100,

        currency: "INR",

        receipt:
          order._id.toString(),
      };

      const razorpayOrder =
        await razorpay.orders.create(
          options
        );

      await Payment.create({
        orderId:
          order._id,

        userId:
          req.user._id,

        amountPaid:
          order.finalPrice,

        paymentGatewayResponse:
          razorpayOrder,
      });

      res.status(200).json({
        razorpayOrder,
        key:
          process.env
            .RAZORPAY_KEY_ID,
      });
    }
   
    catch (error) {
 console.error(error);

  res.status(500).json({
    message:
      error.message,
    error,
  });
}
  };

  const verifyPayment= async(req,res)=>{
    try{
        const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId,
      } = req.body;

      const generatedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
      .update(
        razorpay_order_id +
              "|" +
              razorpay_payment_id
      ).digest("hex");
      if (
        generatedSignature !==
        razorpay_signature
      ) {
        return res.status(400).json({
          message:
            "Payment verification failed",
        });
      }
      const order =
        await Order.findById(
          orderId
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }
      order.isPaid = true;
      order.paidAt =
        new Date();

      await order.save();

       const payment =
        await Payment.findOne({
          orderId:
            order._id,
        });
    
      if (payment) {
        payment.paymentStatus =
          "paid";

        payment.transactionId =
          razorpay_payment_id;

        payment.paidAt =
          new Date();

        payment.paymentGatewayResponse =
          req.body;

        await payment.save();
      }
        for (const item of order.orderItems) {
        const product =
          await Product.findById(
            item.productId
          );
            const variant =
          product.variants.find(
            (v) =>
              v.color ===
                item.selectedColor &&
              v.size ===
                item.selectedSize
          );
           if (variant) {
          variant.stock -=
            item.quantity;
        }

        await product.save();
      }
      const user =
        await User.findById(
          order.user
        );

      user.cart = [];

      await user.save();
       res.status(200).json({
        message:
          "Payment verified successfully",
      });
        
    }catch(error){
        res.status(500).json({
        message:
          error.message,
      });
    }
  }

export {
  createRazorpayOrder,
  verifyPayment
};