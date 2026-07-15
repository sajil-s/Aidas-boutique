import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/productService.js";
import ProductCard from "../../components/products/ProductCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

const category =
  searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts({
  category,
});

        // if backend returns { products: [...] }
        if (Array.isArray(data?.products)) {
          setProducts(data.products);
        }
        // if backend returns plain array
        else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        const message =
          error?.response?.data?.message || "Failed to load products";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <Loader text="Loading products..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Our Products"
        subtitle="Explore handcrafted products, compare variants, and open product details before adding items to your cart."
      />

      {products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="There are no active products available right now."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;