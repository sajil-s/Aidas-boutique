function RecentOrdersTable({ orders }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-5 border-b">
        <h2 className="text-xl font-semibold">
          Recent Orders
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Paid</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">
                  <div>
                    <p className="font-medium">
                      {order.user?.name}
                    </p>

                    <p className="text-slate-500 text-xs">
                      {order.user?.email}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  ₹{order.finalPrice}
                </td>

                <td className="p-4">
                  {order.orderStatus}
                </td>

                <td className="p-4">
                  {order.isPaid ? "✅ Paid" : "❌ Unpaid"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrdersTable;