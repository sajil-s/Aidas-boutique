


import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";

function Cart() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    cartItems,
    cartLoading,
    updateCartItemQuantity,
    removeItemFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;
    await updateCartItemQuantity(item._id, item.quantity - 1);
  };

  const handleIncrease = async (item) => {
    await updateCartItemQuantity(item._id, item.quantity + 1);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  if (cartLoading && cartItems.length === 0) {
    return <Loader text="Loading your cart..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Cart"
        subtitle="Review selected products, adjust quantities, and continue to checkout."
      />

      {cartItems.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven’t added anything yet. Explore products and add your favorites to the cart."
          actionText="Continue Shopping"
          actionLink="/products"
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="xl:col-span-2 space-y-5">
            {cartItems.map((item) => {
              const hasValidImage =
                item.image &&
                !item.image.includes("image1.com") &&
                !item.image.includes("image2.com");

              return (
                <div
                  key={item._id}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"
                >
                  <div className="flex flex-col gap-5 md:flex-row">
                    {/* Image */}
                    <div className="h-32 w-full overflow-hidden rounded-2xl bg-slate-100 md:h-32 md:w-32 shrink-0">
                      {hasValidImage ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-500">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h2 className="text-lg font-bold text-slate-900">
                            {item.title}
                          </h2>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                              Color: {item.selectedColor}
                            </span>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                              Size: {item.selectedSize}
                            </span>
                          </div>

                          <p className="mt-3 text-sm text-slate-500">
                            Price per item: ₹{item.price}
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-sm text-slate-500">Line Total</p>
                          <p className="text-xl font-bold text-slate-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Bottom controls */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Quantity */}
                        <div className="inline-flex w-fit items-center overflow-hidden rounded-2xl border border-slate-300">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="flex h-11 w-11 items-center justify-center text-slate-700 transition hover:bg-slate-100"
                          >
                            <Minus size={18} />
                          </button>

                          <div className="flex h-11 min-w-12 items-center justify-center border-x border-slate-300 px-4 text-base font-semibold text-slate-900">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() => handleIncrease(item)}
                            className="flex h-11 w-11 items-center justify-center text-slate-700 transition hover:bg-slate-100"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItemFromCart(item._id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue shopping */}
            <div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Total Items</span>
                  <span className="font-semibold text-slate-900">
                    {totalItems}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">
                    Free
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-slate-900">
                      ₹{subtotal}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Taxes and final payment details will be shown at checkout.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  Secure checkout with order summary, shipping details, and payment verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;