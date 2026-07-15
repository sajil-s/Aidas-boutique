

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getMyOrders } from "../../services/orderService.js";
import PageHeader from "../../components/common/PageHeader.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        const message =
          error?.response?.data?.message || "Failed to load orders";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loader text="Loading your orders..." />;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="My Orders"
        message="You have not placed any orders yet."
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="My Orders"
        subtitle="Track your placed orders and payment status"
      />

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-lg p-5 border"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 break-all">
                  <span className="font-semibold text-gray-700">
                    Order ID:
                  </span>{" "}
                  {order._id}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-700">
                    Date:
                  </span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-700">
                    Items:
                  </span>{" "}
                  {order.orderItems.length}
                </p>
              </div>

              {/* Middle */}
              <div className="space-y-2">
                <div className="text-sm flex items-center gap-2">
                  <span className="font-semibold">Payment:</span>
                  <StatusBadge status={order.isPaid ? "Paid" : "Unpaid"} />
                </div>

                <div className="text-sm flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <StatusBadge status={order.orderStatus} />
                </div>

                <p className="text-sm font-semibold">
                  Total: ₹{order.finalPrice}
                </p>
              </div>

              {/* Right */}
              <div>
                <Link
                  to={`/orders/${order._id}`}
                  className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
