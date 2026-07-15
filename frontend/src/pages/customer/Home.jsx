import heroImg1 from "../../assets/images/image-1.png";
import heroImg2 from "../../assets/images/image-2.png";
import heroImg3 from "../../assets/images/image-3.png";


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, ShieldCheck, Truck } from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import { getProducts } from "../../services/productService.js";
import HeroCarousel from "../../components/home/HeroCarousel.jsx";

function Home() {
  const { user, isAuthenticated } = useAuth();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

 const heroImages = [heroImg1, heroImg2, heroImg3];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoadingProducts(true);
        const data = await getProducts();
        setFeaturedProducts(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (error) {
        console.error("Failed to load featured products:", error);
        setFeaturedProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="space-y-24">
      {/* HERO SECTION */}
     <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-4">
  {/* Left Side */}
  <div className="space-y-7">
    <div className="inline-flex items-center gap-2 rounded-full border border-camel/40 bg-white px-4 py-2 text-sm font-medium text-wine">
      <Sparkles size={15} />
      Handcrafted Fashion · Simple Shopping · Secure Checkout
    </div>

    <div className="space-y-4">
      <h1 className="font-display text-5xl sm:text-6xl lg:text-[3.75rem] leading-[1.05] text-ink">
        Discover stylish{" "}
        <span className="italic text-wine">handcrafted</span> fashion
        with AIDAS
      </h1>

      <p className="text-lg text-ink/60 max-w-xl leading-8">
        Explore quality products, choose your size and color, add items
        to cart, and place orders with a smooth shopping experience.
      </p>
    </div>

    <div className="flex flex-wrap gap-4">
      <Link
        to="/products"
        className="inline-flex items-center justify-center rounded-full bg-wine px-7 py-3.5 text-white font-semibold hover:bg-wine-light transition"
      >
        Shop Now
      </Link>

      <Link
        to={isAuthenticated ? "/orders" : "/register"}
        className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-transparent px-7 py-3.5 font-semibold text-ink hover:border-wine/40 hover:text-wine transition"
      >
        {isAuthenticated ? "View My Orders" : "Create Account"}
      </Link>
    </div>

    {/* Logged in / guest message */}
    <div className="rounded-2xl border border-camel/30 bg-white px-5 py-4">
      {isAuthenticated ? (
        <div>
          <p className="font-semibold text-ink">
            Welcome back, {user?.name}
          </p>
          <p className="text-sm text-taupe mt-1">
            You're logged in and ready to shop.
          </p>
        </div>
      ) : (
        <div>
          <p className="font-semibold text-ink">New here?</p>
          <p className="text-sm text-taupe mt-1">
            Register an account to save your shopping flow, place
            orders, and track them later.
          </p>
        </div>
      )}
    </div>
  </div>


  {/* Right Side Hero Image */}
<div className="relative min-h-[420px] h-full">
  <HeroCarousel images={heroImages} />

  {/* Fade only on the left edge, blending into the text column */}
  <div className="absolute inset-y-0 left-0 w- bg-gradient-to-r from-bone to-transparent pointer-events-none hidden lg:block" />
</div>
</section>

      {/* WHY SHOP SECTION */}
      <section className="space-y-10">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.2em] uppercase text-wine font-medium mb-3">
            The AIDAS Difference
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">
            Why shop with AIDAS?
          </h2>
          <p className="mt-3 text-ink/60 text-lg leading-8">
            This store is built to keep the shopping flow simple — discover
            products, choose variants, add to cart, checkout, and track your
            orders without confusion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ShoppingBag,
              title: "Easy Product Browsing",
              text: "Explore products, view details, select size and color variants, and add items to cart with a simple flow.",
            },
            {
              icon: ShieldCheck,
              title: "Secure Checkout",
              text: "Create orders, proceed to payment, and keep order data organized with protected customer routes.",
            },
            {
              icon: Truck,
              title: "Order Tracking Flow",
              text: "View your order history, open order details, and check payment and delivery status from your account.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-camel/25 bg-white p-7 shadow-sm shadow-ink/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-wine/10">
                <Icon className="text-wine" size={22} />
              </div>
              <h3 className="font-display text-xl text-ink mb-3">{title}</h3>
              <p className="text-ink/60 leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="space-y-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-wine font-medium mb-3">
              New In
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink">
              Featured Products
            </h2>
            <p className="mt-3 text-ink/60 text-lg">
              A quick preview of products currently available in the store.
            </p>
          </div>

          <Link
            to="/products"
            className="rounded-full border border-ink/15 bg-transparent px-5 py-3 font-semibold text-ink hover:border-wine/40 hover:text-wine transition"
          >
            View All Products
          </Link>
        </div>

        {loadingProducts ? (
          <div className="rounded-2xl border border-camel/25 bg-white p-8 text-center text-taupe shadow-sm">
            Loading featured products...
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-camel/40 bg-white p-8 text-center shadow-sm">
            <h3 className="font-display text-xl text-ink">
              No products available yet
            </h3>
            <p className="mt-2 text-taupe">
              Add products in the backend and they'll show up here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
            {featuredProducts.map((product) => {
              const hasDiscount =
                product.basePrice &&
                product.basePrice !== product.discountPrice;

              return (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                
                  className="group rounded-2xl border border-camel/25 bg-white overflow-hidden flex flex-col transition hover:border-wine/30 hover:shadow-md hover:shadow-ink/10"
                >
                  <div className="relative h-64 bg-camel/10 overflow-hidden">
                    {product.images?.[0] &&
                    product.images[0] !== "https://image1.com" &&
                    product.images[0] !== "https://image2.com" ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-taupe text-sm">
                        No Image Available
                      </div>
                    )}

                    {/* Signature hang-tag price badge */}
                    <div className="absolute top-3 right-3 flex items-center">
                      <div className="relative bg-wine text-white pl-4 pr-3 py-2 shadow-md shadow-ink/20 [clip-path:polygon(22%_0,100%_0,100%_100%,22%_100%,0_50%)]">
                        <span className="font-display text-sm font-semibold whitespace-nowrap">
                          ₹{product.discountPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs tracking-wide uppercase text-taupe mb-2">
                      {product.category}
                    </p>

                    <h3 className="font-display text-lg text-ink line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-ink/55 text-sm line-clamp-2 flex-1">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-lg font-semibold text-ink">
                        ₹{product.discountPrice}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-taupe line-through">
                          ₹{product.basePrice}
                        </span>
                      )}
                    </div>

                    <span className="mt-5 inline-flex items-center justify-center rounded-full bg-ink px-4 py-3 text-white text-sm font-semibold group-hover:bg-wine transition">
                      View Details
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* FINAL CTA */}
      <section className="rounded-[2rem] bg-ink px-8 py-14 text-white">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-camel font-medium">
            Start Browsing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl italic">
            Ready to explore the store?
          </h2>
          <p className="text-white/60 text-lg leading-8">
            Browse products, add your favorites to cart, and test the
            complete ecommerce flow from product page to order details.
          </p>

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-semibold text-ink hover:bg-camel/20 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;