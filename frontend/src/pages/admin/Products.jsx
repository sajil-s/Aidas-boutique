import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { getAllProducts,toggleProductStatus } from "../../services/adminProductService.js";
import ProductTable from "../../components/admin/products/ProductTable.jsx";
import ProductForm from "../../components/admin/products/ProductForm.jsx";


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("no product found",error);
    } finally {
      setLoading(false);
    }
  };

 const handleToggleStatus = async (product) => {
  try {
    await toggleProductStatus(
      product._id,
      !product.isActive
    );

    toast.success(
      product.isActive
        ? "Product deactivated"
        : "Product activated"
    );

    fetchProducts();
  } catch (error) {
    toast.error("Failed to update status");
  }
};


  if (loading) {
    return <h1>Loading...</h1>;
  }

 return (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">
        Products
      </h1>

      <button
  onClick={() => setShowForm(true)}
  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-slate-800"
>
  + Add Product
</button>
    </div>

   <ProductTable
  products={products}
  onEdit={(product) => {
    setSelectedProduct(product);
    setShowForm(true);
  }}
   onToggleStatus={handleToggleStatus}
/>

   <ProductForm
  isOpen={showForm}
  onClose={() => {
    setShowForm(false);
    setSelectedProduct(null);
  }}
  fetchProducts={fetchProducts}
  selectedProduct={selectedProduct}
/>
  </div>
);
}

export default Products;