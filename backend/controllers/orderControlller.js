import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const createOrder = async (req, res) => {
    try {
        const {
            shippingAddress,
        } = req.body;

        const user =
            await User.findById(
                req.user._id
            );

        if (
            !user.cart.length
        ) {
            return res.status(400).json({
                message:
                    "Cart is empty",
            });
        }
        const orderItems =
            [];

        let itemPrice = 0;
        for (const item of user.cart) {
            const product =
                await Product.findById(
                    item.productId
                );
            if (
                !product ||
                !product.isActive
            ) {
                return res.status(404).json({
                    message:
                        "Product not found",
                });
            }
            const variant =
                product.variants.find(
                    (v) =>
                        v.color ===
                        item.selectedColor &&
                        v.size ===
                        item.selectedSize
                );

            if (!variant) {
                return res.status(400).json({
                    message:
                        "Variant not found",
                });
            }
            if (
                item.quantity >
                variant.stock
            ) {
                return res.status(400).json({
                    message:
                        `Insufficient stock for ${product.title}`,
                });
            }
            const price =
                product.discountPrice;

            itemPrice +=
                price *
                item.quantity;

            orderItems.push({
                productId:
                    product._id,
                title:
                    product.title,
                selectedColor:
                    item.selectedColor,
                selectedSize:
                    item.selectedSize,
                quantity:
                    item.quantity,
                priceAtPurchase:
                    price,
            });
        }
        const shippingPrice =
            0;

        const taxPrice = 0;

        const finalPrice =
            itemPrice +
            shippingPrice +
            taxPrice;
        const order =
            await Order.create({
                user:
                    req.user._id,
                orderItems,
                shippingAddress,
                itemPrice,
                shippingPrice,
                taxPrice,
                finalPrice,
            });
        res.status(201).json(
            order
        );
    } catch (error) {
        res.status(500).json({
            message:
                error.message,
        });
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user:
                req.user._id,
        }).sort({
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

const getOrderById =
  async (req, res) => {
    try {
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

      const isOwner =
        order.user.toString() ===
        req.user._id.toString();

      const isAdmin =
        req.user.role ===
        "admin";

      if (
        !isOwner &&
        !isAdmin
      ) {
        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      res.status(200).json(
        order
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };





export { createOrder, getMyOrders,getOrderById,
    }