


import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Minus, Plus } from "lucide-react";

import { getProductById } from "../../services/productService";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addItemToCart, cartLoading } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);

        if (data?.variants?.length > 0) {
          setSelectedColor(data.variants[0].color);
          setSelectedSize(data.variants[0].size);
        }
      } catch (error) {
        setError(
          error?.response?.data?.message || "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const colors = useMemo(() => {
    if (!product?.variants) return [];
    return [...new Set(product.variants.map((variant) => variant.color))];
  }, [product]);

  const sizes = useMemo(() => {
    if (!product?.variants || !selectedColor) return [];

    return product.variants
      .filter((variant) => variant.color === selectedColor)
      .map((variant) => variant.size);
  }, [product, selectedColor]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants) return null;

    return (
      product.variants.find(
        (variant) =>
          variant.color === selectedColor &&
          variant.size === selectedSize
      ) || null
    );
  }, [product, selectedColor, selectedSize]);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    if (!selectedVariant) return;

    setQuantity((prev) =>
      prev < selectedVariant.stock ? prev + 1 : prev
    );
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!selectedVariant) return;
    if (selectedVariant.stock < 1) return;

    const cartData = {
      productId: product._id,
      selectedColor,
      selectedSize,
      quantity,
    };

    const result = await addItemToCart(cartData);

    if (result?.success) {
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Loading product...
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Please wait while we fetch the product details.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-medium text-slate-700">
          Product not found.
        </h2>
      </div>
    );
  }

  const hasValidImage =
    product.images &&
    product.images.length > 0 &&
    product.images[0] &&
    !product.images[0].includes("image1.com") &&
    !product.images[0].includes("image2.com");

  const discountPercent =
    product.basePrice && product.basePrice > product.discountPrice
      ? Math.round(
          ((product.basePrice - product.discountPrice) / product.basePrice) * 100
        )
      : 0;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* LEFT: IMAGE */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          {hasValidImage ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-[420px] w-full object-cover md:h-[520px]"
            />
          ) : (
            <div className="flex h-[420px] w-full items-center justify-center text-sm font-medium text-slate-500 md:h-[520px]">
              No Image Available
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: DETAILS */}
      <div className="space-y-8">
        {/* Product header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              {product.category}
            </span>

            {product.craft && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Craft: {product.craft}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {product.title}
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            {product.description}
          </p>

          {/* Price block */}
          <div className="mt-6 rounded-2xl bg-slate-50 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">
                ₹{product.discountPrice}
              </span>

              {product.basePrice &&
                product.basePrice !== product.discountPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    ₹{product.basePrice}
                  </span>
                )}

              {discountPercent > 0 && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Inclusive of all taxes. Final price shown before checkout.
            </p>
          </div>
        </div>

        {/* Color selection */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Select Color
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);

                  const firstSizeForColor =
                    product.variants.find(
                      (variant) => variant.color === color
                    )?.size || "";

                  setSelectedSize(firstSizeForColor);
                  setQuantity(1);
                }}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  selectedColor === color
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size selection */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Select Size
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setQuantity(1);
                }}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  selectedSize === size
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Stock + quantity + summary */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Quantity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Adjust quantity before adding to cart.
              </p>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                selectedVariant?.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {selectedVariant?.stock > 0
                ? `${selectedVariant.stock} in stock`
                : "Out of stock"}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex items-center overflow-hidden rounded-2xl border border-slate-300">
              <button
                onClick={handleDecrease}
                className="flex h-12 w-12 items-center justify-center text-slate-700 transition hover:bg-slate-100"
              >
                <Minus size={18} />
              </button>

              <div className="flex h-12 min-w-14 items-center justify-center border-x border-slate-300 px-4 text-base font-semibold text-slate-900">
                {quantity}
              </div>

              <button
                onClick={handleIncrease}
                className="flex h-12 w-12 items-center justify-center text-slate-700 transition hover:bg-slate-100"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Selected variant */}
          {selectedVariant && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Selected Variant
              </h3>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-3 border border-slate-200">
                  <p className="text-xs text-slate-500">Color</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedVariant.color}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 border border-slate-200">
                  <p className="text-xs text-slate-500">Size</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedVariant.size}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 border border-slate-200">
                  <p className="text-xs text-slate-500">Available Stock</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedVariant.stock}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={cartLoading || selectedVariant?.stock < 1}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <ShoppingCart size={20} />
            {cartLoading
              ? "Adding..."
              : selectedVariant?.stock < 1
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;