function LowStockTable({ products }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-5 border-b">
        <h2 className="text-xl font-semibold">
          Low Stock Products
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Color</th>
              <th className="text-left p-4">Size</th>
              <th className="text-left p-4">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.flatMap((product) =>
              product.variants.map((variant) => (
                <tr
                  key={`${product._id}-${variant.sku}`}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4 font-medium">
                    {product.title}
                  </td>

                  <td className="p-4">
                    {variant.color}
                  </td>

                  <td className="p-4">
                    {variant.size}
                  </td>

                  <td className="p-4">
                    {variant.stock}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LowStockTable;