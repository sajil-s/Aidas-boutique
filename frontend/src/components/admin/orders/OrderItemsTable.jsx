function OrderItemsTable({ orderItems }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Ordered Products
      </h2>

      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="text-left py-3">Product</th>
            <th className="text-left py-3">Color</th>
            <th className="text-left py-3">Size</th>
            <th className="text-left py-3">Qty</th>
            <th className="text-left py-3">Price</th>
            <th className="text-left py-3">Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {orderItems.map((item, index) => (
            <tr
              key={index}
              className="border-b last:border-none"
            >
              <td className="py-4">
                {item.title}
              </td>

              <td>{item.selectedColor}</td>

              <td>{item.selectedSize}</td>

              <td>{item.quantity}</td>

              <td>
                ₹{item.priceAtPurchase}
              </td>

              <td className="font-semibold">
                ₹
                {item.priceAtPurchase *
                  item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderItemsTable;