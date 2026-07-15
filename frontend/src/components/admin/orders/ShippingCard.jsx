function ShippingCard({ shippingAddress }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Shipping Address
      </h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">
            Name:
          </span>{" "}
          {shippingAddress.fullName}
        </p>

        <p>
          <span className="font-semibold">
            Phone:
          </span>{" "}
          {shippingAddress.phoneNumber}
        </p>

        <p>
          <span className="font-semibold">
            Address:
          </span>{" "}
          {shippingAddress.addressLine1}
        </p>

        {shippingAddress.addressLine2 && (
          <p>{shippingAddress.addressLine2}</p>
        )}

        <p>
          {shippingAddress.city},{" "}
          {shippingAddress.state}
        </p>

        <p>
          {shippingAddress.postalCode}
        </p>
      </div>
    </div>
  );
}

export default ShippingCard;