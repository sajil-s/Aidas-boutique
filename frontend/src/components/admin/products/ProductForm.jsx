import { useState,useEffect  } from "react";
import ImageUploader from "./ImageUploader.jsx";
import VariantSection from "./VariantSection.jsx";
import { toast } from "react-hot-toast";
import { createProduct,updateProduct } from "../../../services/adminProductService.js";



function ProductForm({ isOpen, onClose,  fetchProducts,
  selectedProduct, }) {
  const [formData, setFormData] = useState({
  title: "",
  category: "",
  craft: "",
  description: "",
  basePrice: "",
  discountPrice: "",
  isFeatured: false,
  isActive: true,
});

const [imageUrls, setImageUrls] = useState([]);
const [variants, setVariants] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  if (selectedProduct) {
    setFormData({
      title: selectedProduct.title,
      category: selectedProduct.category,
      craft: selectedProduct.craft || "",
      description: selectedProduct.description,
      basePrice: selectedProduct.basePrice,
      discountPrice: selectedProduct.discountPrice,
      isFeatured: selectedProduct.isFeatured,
      isActive: selectedProduct.isActive,
    });

    setImageUrls(selectedProduct.images || []);
    setVariants(selectedProduct.variants || []);
  } else {
    resetForm();
  }
}, [selectedProduct]);


const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

const resetForm = () => {
  setFormData({
    title: "",
    category: "",
    craft: "",
    description: "",
    basePrice: "",
    discountPrice: "",
    isFeatured: false,
    isActive: true,
  });

  setImageUrls([]);
  setVariants([]);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (imageUrls.length === 0) {
    return toast.error("Please upload at least one image");
  }

  if (variants.length === 0) {
    return toast.error("Please add at least one variant");
  }

  try {
    setLoading(true);

    const productData = {
      ...formData,
      basePrice: Number(formData.basePrice),
      discountPrice: Number(formData.discountPrice),
      images: imageUrls,
      variants,
    };

   if (selectedProduct) {
  await updateProduct(
    selectedProduct._id,
    productData
  );

  toast.success("Product updated successfully");
} else {
  await createProduct(productData);

  toast.success("Product created successfully");
}

    resetForm();

    fetchProducts();

    onClose();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to create product"
    );
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
         <h2 className="text-2xl font-bold">
  {selectedProduct ? "Edit Product" : "Add Product"}
</h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-red-600"
          >
            ×
          </button>
        </div>

 <form
  onSubmit={handleSubmit}
  className="space-y-5"
>

  <div>
    <label className="block font-medium mb-2">
      Title
    </label>

    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
      placeholder="Product title"
    />
  </div>

  <div>
    <label className="block font-medium mb-2">
      Category
    </label>

    <input
      type="text"
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
      placeholder="Category"
    />
  </div>

  <div>
    <label className="block font-medium mb-2">
      Craft
    </label>

    <input
      type="text"
      name="craft"
      value={formData.craft}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
      placeholder="Craft"
    />
  </div>

  <div>
    <label className="block font-medium mb-2">
      Description
    </label>

    <textarea
      rows="4"
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
      placeholder="Product description"
    />
  </div>
  <div className="grid grid-cols-2 gap-4">

  <div>
    <label className="block font-medium mb-2">
      Base Price
    </label>

    <input
      type="number"
      name="basePrice"
      value={formData.basePrice}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
      placeholder="0"
    />
  </div>

  <div>
    <label className="block font-medium mb-2">
      Discount Price
    </label>

    <input
      type="number"
      name="discountPrice"
      value={formData.discountPrice}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
      placeholder="0"
    />
  </div>

</div>
<div className="flex gap-8">

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="isFeatured"
      checked={formData.isFeatured}
      onChange={handleChange}
    />

    Featured
  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="isActive"
      checked={formData.isActive}
      onChange={handleChange}
    />

    Active
  </label>

</div>

<ImageUploader
  imageUrls={imageUrls}
  setImageUrls={setImageUrls}
/>

<VariantSection
  variants={variants}
  setVariants={setVariants}
/>

<div className="flex justify-end gap-3">

  <button
    type="button"
    onClick={onClose}
    className="px-5 py-2 border rounded-lg"
  >
    Cancel
  </button>

  <button
  type="submit"
  disabled={loading}
  className="px-5 py-2 bg-black text-white rounded-lg disabled:opacity-50"
>
  {loading
  ? selectedProduct
    ? "Updating..."
    : "Saving..."
  : selectedProduct
    ? "Update Product"
    : "Save Product"}
</button>

</div>

</form>

      </div>
    </div>
  );
}

export default ProductForm;