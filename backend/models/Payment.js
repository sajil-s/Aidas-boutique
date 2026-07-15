import mongoose from "mongoose";

const paymentSchema =
  new mongoose.Schema(
    {
      orderId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      paymentMethod: {
        type: String,
        default:
          "Razorpay",
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
        ],
        default:
          "pending",
      },

      transactionId: {
        type: String,
      },

      paymentGatewayResponse: {
        type: Object,
      },

      currency: {
        type: String,
        default: "INR",
      },

      amountPaid: {
        type: Number,
        required: true,
      },

      paidAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

const Payment =
  mongoose.model(
    "Payment",
    paymentSchema
  );

export default Payment;