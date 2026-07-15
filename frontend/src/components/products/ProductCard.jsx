

import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const firstImage =
    product?.images?.[0] &&
    product.images[0] !== "https://image1.com" &&
    product.images[0] !== "https://image2.com"
      ? product.images[0]
      : null;

  const totalStock =
    product?.variants?.reduce(
      (sum, variant) => sum + (variant.stock || 0),
      0
    ) || 0;

  const variantCount = product?.variants?.length || 0;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        {firstImage ? (
          <img
            src={firstImage}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-slate-500">
            No Image Available
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
          {totalStock > 0 ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
            {product.title}
          </h3>

          <p className="line-clamp-2 text-sm text-slate-600 min-h-[40px]">
            {product.description || "No description available for this product."}
          </p>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-bold text-slate-900">
            ₹{product.discountPrice}
          </span>

          {product.price > product.discountPrice && (
            <span className="text-sm text-slate-400 line-through">
              ₹{product.price}
            </span>
          )}
        </div>

        {/* Extra info */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>{variantCount} variants</span>
          <span>{totalStock} in stock</span>
        </div>

        {/* CTA */}
        <Link
          to={`/product/${product._id}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;