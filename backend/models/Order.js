import mongoose from "mongoose";

const orderItemSchema=new mongoose.Schema(
    {
        productId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },

      selectedColor: {
        type: String,
        required: true,
      },

      selectedSize: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },
      priceAtPurchase: {
        type: Number,
        required: true,
      },
    },
    {
        _id:false
    }
);


const shippingAddressSchema= new mongoose.Schema(
    {
        fullName: {
        type: String,
        required: true,
      },

      addressLine1: {
        type: String,
        required: true,
      },

      addressLine2: {
        type: String,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      phoneNumber: {
        type: String,
        required: true,
      },
    },
    {
        _id:false
    }
);

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      orderItems: [
        orderItemSchema,
      ],

      shippingAddress:
        shippingAddressSchema,

      itemPrice: {
        type: Number,
        required: true,
      },

      shippingPrice: {
        type: Number,
        required: true,
        default: 0,
      },

      taxPrice: {
        type: Number,
        required: true,
        default: 0,
      },

      finalPrice: {
        type: Number,
        required: true,
      },

      orderStatus: {
        type: String,
        enum: [
          "pending",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
        ],
        default: "pending",
      },

      trackingNumber: {
        type: String,
      },

      shippedAt: {
        type: Date,
      },

      deliveredAt: {
        type: Date,
      },
      isPaid:{
        type:Boolean,
        default:false
      },
      paidAt:{
        type:Date
      }
    },
    {
      timestamps: true,
    }
  );

const Order =
  mongoose.model(
    "Order",
    orderSchema
  );

export default Order;