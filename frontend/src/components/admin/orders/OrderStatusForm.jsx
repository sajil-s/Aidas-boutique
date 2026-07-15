import { useState } from "react";
import { toast } from "react-hot-toast";

import { updateOrderStatus } from "../../../services/adminOrderService.js";

function OrderStatusForm({ order, fetchOrder }) {
  const [status, setStatus] = useState(order.orderStatus);
  const [trackingNumber, setTrackingNumber] = useState(
    order.trackingNumber || ""
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateOrderStatus(order._id, {
        orderStatus: status,
        trackingNumber,
      });

      toast.success("Order updated");

      fetchOrder();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">
        Update Order
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">
            Order Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="pending">
              Pending
            </option>

            <option value="processing">
              Processing
            </option>

            <option value="shipped">
              Shipped
            </option>

            <option value="delivered">
              Delivered
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Tracking Number
          </label>

          <input
            type="text"
            value={trackingNumber}
            onChange={(e) =>
              setTrackingNumber(e.target.value)
            }
            placeholder="Tracking Number"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-slate-800"
        >
          {loading
            ? "Updating..."
            : "Update Order"}
        </button>
      </form>
    </div>
  );
}

export default OrderStatusForm;