

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getOrderById } from "../../services/orderService.js";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../../services/paymentService.js";
import { useCart } from "../../context/CartContext.jsx";

function PaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  const [order, setOrder] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setPageLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        const message =
          error?.response?.data?.message || "Failed to load order";
        toast.error(message);
      } finally {
        setPageLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const totalItems = useMemo(() => {
    if (!order?.orderItems) return 0;
    return order.orderItems.reduce((total, item) => total + item.quantity, 0);
  }, [order]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayNow = async () => {
    if (!order) return;

    try {
      setPaying(true);

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay");
        return;
      }

      const paymentData = await createRazorpayOrder(order._id);
      const { razorpayOrder, key } = paymentData;

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "AIDAS",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });

            toast.success("Payment successful");
            await fetchCart();
            navigate(`/orders/${order._id}`);
          } catch (error) {
            const message =
              error?.response?.data?.message || "Payment verification failed";
            toast.error(message);
          }
        },

        prefill: {
          name: order.shippingAddress?.fullName || "",
          contact: order.shippingAddress?.phoneNumber || "",
        },

        theme: {
          color: "#000000",
        },

        modal: {
          ondismiss: function () {
            toast("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to start payment";
      toast.error(message);
    } finally {
      setPaying(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading payment page...
        </h2>
        <p className="text-gray-600">
          Please wait while we fetch your order details.
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">
          Order not found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn’t find this order. Try going back to your orders page.
        </p>
        <Link
          to="/orders"
          className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
        >
          Go to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
          Secure Payment
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Complete your payment
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Review your order details and finish payment securely with Razorpay.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="xl:col-span-2 space-y-6">
          {/* Order Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Overview
                </h2>
                <p className="text-gray-600 mt-2">
                  Order ID:{" "}
                  <span className="font-medium text-gray-900 break-all">
                    {order._id}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Payment Pending"}
                </span>

                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 capitalize">
                  {order.orderStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Shipping Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="font-semibold text-gray-900">
                  {order.shippingAddress.fullName}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <p className="font-semibold text-gray-900">
                  {order.shippingAddress.phoneNumber}
                </p>
              </div>

              <div className="md:col-span-2 rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                <p className="font-semibold text-gray-900 leading-7">
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2
                    ? `, ${order.shippingAddress.addressLine2}`
                    : ""}
                  , {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order Items</h2>
                <p className="text-gray-600 mt-1">
                  {totalItems} item{totalItems > 1 ? "s" : ""} in this order
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-900 whitespace-nowrap">
                      ₹{item.priceAtPurchase * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Payment Summary
              </h2>
              <p className="text-gray-600 mt-2">
                Review the final amount before continuing.
              </p>
            </div>

            <div className="space-y-3 text-gray-700 mb-6">
              <div className="flex justify-between">
                <span>Items Price</span>
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

              <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>₹{order.finalPrice}</span>
              </div>
            </div>

            <button
              onClick={handlePayNow}
              disabled={paying || order.isPaid}
              className="w-full rounded-xl bg-black text-white py-3.5 font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {order.isPaid
                ? "Already Paid"
                : paying
                ? "Processing..."
                : `Pay ₹${order.finalPrice}`}
            </button>

            <p className="text-sm text-gray-500 mt-3">
              You’ll be redirected to Razorpay’s secure payment window to
              complete this payment.
            </p>

            <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="text-sm font-medium text-gray-800">
                Payment Security
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Your payment is processed securely through Razorpay. We do not
                store card or UPI credentials on AIDAS.
              </p>
            </div>

            {order.isPaid && (
              <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4">
                <p className="text-sm font-medium text-green-700">
                  This order has already been paid.
                </p>
                <button
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="mt-3 w-full rounded-lg border border-green-300 bg-white py-2.5 text-sm font-medium text-green-700 hover:bg-green-50 transition"
                >
                  View Order Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;