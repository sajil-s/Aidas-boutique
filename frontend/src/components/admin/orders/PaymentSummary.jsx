function PaymentSummary({ order }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Payment Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Items</span>
          <span>₹{order.itemPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{order.shippingPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{order.taxPrice}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{order.finalPrice}</span>
        </div>

        <div className="pt-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              order.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {order.isPaid ? "Paid" : "Unpaid"}
          </span>
        </div>

      </div>
    </div>
  );
}

export default PaymentSummary;