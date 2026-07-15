function ProductTable({ products, onEdit, onToggleStatus }) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 flex gap-4"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-20 h-20 rounded-lg object-cover shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium truncate">{product.title}</p>
                <span
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                    product.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-1">
                {product.category}
              </p>
              <p className="text-sm font-semibold mt-1">
                ₹{product.basePrice}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(product)}
                  className="flex-1 px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onToggleStatus(product)}
                  className={`flex-1 px-3 py-1.5 rounded text-white text-sm ${
                    product.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {product.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-slate-50">
                <td className="p-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>
                <td className="p-4 font-medium">{product.title}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">₹{product.basePrice}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onToggleStatus(product)}
                    className={`px-3 py-1 rounded text-white ${
                      product.isActive
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {product.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductTable;