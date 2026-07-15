import { useState } from "react";

function VariantSection({ variants, setVariants }) {
  const [variant, setVariant] = useState({
    color: "",
    size: "M",
    stock: "",
    sku: "",
  });

  const handleChange = (e) => {
    setVariant({
      ...variant,
      [e.target.name]: e.target.value,
    });
  };

  const addVariant = () => {
    if (
      !variant.color ||
      !variant.stock ||
      !variant.sku
    ) {
      return;
    }

    setVariants((prev) => [...prev, variant]);

    setVariant({
      color: "",
      size: "M",
      stock: "",
      sku: "",
    });
  };

  const removeVariant = (index) => {
    setVariants((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">

      <h3 className="text-xl font-semibold">
        Product Variants
      </h3>

      <div className="grid grid-cols-4 gap-3">

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={variant.color}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <select
          name="size"
          value={variant.size}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={variant.stock}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={variant.sku}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

      </div>

      <button
        type="button"
        onClick={addVariant}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        + Add Variant
      </button>

      {variants.length > 0 && (
        <div className="overflow-x-auto">

          <table className="w-full border mt-4">

            <thead className="bg-slate-100">

              <tr>
                <th className="p-2">Color</th>
                <th className="p-2">Size</th>
                <th className="p-2">Stock</th>
                <th className="p-2">SKU</th>
                <th className="p-2">Action</th>
              </tr>

            </thead>

            <tbody>

              {variants.map((item, index) => (

                <tr
                  key={index}
                  className="border-t text-center"
                >
                  <td className="p-2">{item.color}</td>
                  <td className="p-2">{item.size}</td>
                  <td className="p-2">{item.stock}</td>
                  <td className="p-2">{item.sku}</td>

                  <td className="p-2">

                    <button
                      type="button"
                      onClick={() =>
                        removeVariant(index)
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default VariantSection;