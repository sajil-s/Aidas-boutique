
import { Link } from "react-router-dom";

function OrdersTable({ orders }) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">#{order._id.slice(-6)}</p>
              <span className="capitalize text-sm bg-slate-100 px-2.5 py-1 rounded-full">
                {order.orderStatus}
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              {order.user?.name}
            </p>

            <div className="flex items-center justify-between text-sm text-slate-500 mt-2">
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              <span>{order.orderItems.length} items</span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <p className="font-semibold">₹{order.finalPrice}</p>
              {order.isPaid ? (
                <span className="text-green-600 font-semibold text-sm">
                  Paid
                </span>
              ) : (
                <span className="text-red-600 font-semibold text-sm">
                  Unpaid
                </span>
              )}
            </div>

            <Link
              to={`/admin/orders/${order._id}`}
              className="mt-3 block text-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              View
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Items</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Payment</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-slate-50">
                <td className="p-4">{order._id.slice(-6)}</td>
                <td className="p-4">{order.user?.name}</td>
                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">{order.orderItems.length}</td>
                <td className="p-4">₹{order.finalPrice}</td>
                <td className="p-4">
                  {order.isPaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unpaid</span>
                  )}
                </td>
                <td className="p-4">
                  <span className="capitalize">{order.orderStatus}</span>
                </td>
                <td className="p-4">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrdersTable;