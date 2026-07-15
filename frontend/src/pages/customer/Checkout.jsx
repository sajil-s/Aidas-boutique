

import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useCart } from "../../context/CartContext.jsx";
import { createOrder } from "../../services/orderService.js";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [placingOrder, setPlacingOrder] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    // remove error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shippingAddress.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!shippingAddress.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(shippingAddress.phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!shippingAddress.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required";
    }

    if (!shippingAddress.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!shippingAddress.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!shippingAddress.postalCode.trim()) {
      newErrors.postalCode = "Pincode is required";
    } else if (!/^\d{6}$/.test(shippingAddress.postalCode.trim())) {
      newErrors.postalCode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      setPlacingOrder(true);

      const order = await createOrder(shippingAddress);

      toast.success("Order created successfully");
      navigate(`/payment/${order._id}`);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to create order";

      toast.error(message);
       console.error("Create order failed:", error);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h1>
        <p className="text-gray-600 mb-6">
          Add products to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
          Secure Checkout
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Complete your order
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Enter your shipping details carefully. After placing the order, you’ll
          continue to payment and confirm your purchase.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left - Shipping Form */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Shipping Details
            </h2>
            <p className="text-gray-600 mt-2">
              This address will be used for delivery of your order.
            </p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Full Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-semibold text-gray-800"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    errors.fullName
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-black/10 focus:border-black"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-semibold text-gray-800"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={shippingAddress.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    errors.phoneNumber
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-black/10 focus:border-black"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Address Line 1 */}
            <div>
              <label
                htmlFor="addressLine1"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Address Line 1
              </label>
              <textarea
                id="addressLine1"
                name="addressLine1"
                value={shippingAddress.addressLine1}
                onChange={handleChange}
                rows="4"
                placeholder="House name, street, locality..."
                className={`w-full rounded-xl border px-4 py-3 outline-none transition resize-none ${
                  errors.addressLine1
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-black/10 focus:border-black"
                }`}
              />
              {errors.addressLine1 && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.addressLine1}
                </p>
              )}
            </div>

            {/* Address Line 2 */}
            <div>
              <label
                htmlFor="addressLine2"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Address Line 2 <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                id="addressLine2"
                type="text"
                name="addressLine2"
                value={shippingAddress.addressLine2}
                onChange={handleChange}
                placeholder="Landmark, apartment, etc."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-black/10 focus:border-black"
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-semibold text-gray-800"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    errors.city
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-black/10 focus:border-black"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-2">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-semibold text-gray-800"
                >
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    errors.state
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-black/10 focus:border-black"
                  }`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-2">{errors.state}</p>
                )}
              </div>
            </div>

            {/* Pincode */}
            <div>
              <label
                htmlFor="postalCode"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Pincode
              </label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                placeholder="Enter pincode"
                className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                  errors.postalCode
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-black/10 focus:border-black"
                }`}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.postalCode}
                </p>
              )}
            </div>

            {/* Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={placingOrder}
                className="w-full rounded-xl bg-black py-3.5 text-white font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>

              <p className="text-sm text-gray-500 mt-3">
                After placing the order, you’ll be redirected to Razorpay to
                complete payment securely.
              </p>
            </div>
          </form>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Order Summary
            </h2>
            <p className="text-gray-600 mt-2">
              {totalItems} item{totalItems > 1 ? "s" : ""} in your cart
            </p>
          </div>

          <div className="space-y-4 mb-6 max-h-[420px] overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.selectedColor} / {item.selectedSize}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900 whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-gray-200 pt-5">
            <div className="flex items-center justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex items-center justify-between text-gray-700">
              <span>Shipping</span>
              <span>₹0</span>
            </div>

            <div className="flex items-center justify-between text-gray-700">
              <span>Tax</span>
              <span>₹0</span>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-800">
              Secure Payment
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Payments are processed using Razorpay after order creation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;