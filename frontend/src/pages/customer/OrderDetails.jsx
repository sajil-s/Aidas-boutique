
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getOrderById } from "../../services/orderService.js";
import PageHeader from "../../components/common/PageHeader.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";

function OrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        const message =
          error?.response?.data?.message || "Failed to load order";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <Loader text="Loading order..." />;
  }

  if (!order) {
    return (
      <EmptyState
        title="Order Details"
        message="Order not found."
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="Order Details"
        subtitle="View your order summary, shipping information, and items"
      />

      {/* Order Summary */}
      <div className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 text-gray-700">
          <p className="break-all">
            <span className="font-medium">Order ID:</span> {order._id}
          </p>

          <div className="flex items-center gap-2">
            <span className="font-medium">Payment:</span>
            <StatusBadge status={order.isPaid ? "Paid" : "Unpaid"} />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <StatusBadge status={order.orderStatus} />
          </div>

          <p>
            <span className="font-medium">Total:</span> ₹{order.finalPrice}
          </p>

          <p>
            <span className="font-medium">Items:</span>{" "}
            {order.orderItems.length}
          </p>

          <p>
            <span className="font-medium">Placed On:</span>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

        <div className="space-y-2 text-gray-700">
          <p className="font-medium">{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.phoneNumber}</p>

          <p>
            {order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2
              ? `, ${order.shippingAddress.addressLine2}`
              : ""}
          </p>

          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
            {order.shippingAddress.postalCode}
          </p>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-2xl font-semibold mb-4">Ordered Items</h2>

        <div className="space-y-4">
          {order.orderItems.map((item, index) => (
            <div
              key={`${item.productId}-${index}`}
              className="border rounded-lg p-4"
            >
              <h3 className="font-semibold text-lg">{item.title}</h3>

              <p className="text-sm text-gray-600 mt-1">
                Color: {item.selectedColor}
              </p>

              <p className="text-sm text-gray-600">
                Size: {item.selectedSize}
              </p>

              <p className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </p>

              <p className="text-sm text-gray-600">
                Price per item: ₹{item.priceAtPurchase}
              </p>

              <p className="font-semibold mt-2">
                Item Total: ₹{item.priceAtPurchase * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;