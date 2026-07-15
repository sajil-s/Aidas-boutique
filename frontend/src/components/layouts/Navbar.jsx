
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { getCategories } from "../../services/productService.js";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm transition-colors ${
      isActive(path)
        ? "text-wine font-semibold"
        : "text-ink/70 hover:text-wine"
    }`;

  const mobileLinkClass = (path) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive(path)
        ? "bg-wine text-white"
        : "text-ink/80 hover:bg-camel/10"
    }`;

  return (
    
    <header className="sticky top-0 z-50 border-b border-camel/20 bg-navbar-dark backdrop-blur">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="h-16 flex items-center justify-between gap-4">
      {/* Left side */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="font-display text-2xl italic text-bone tracking-tight"
        >
          AIDAS
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm transition-colors ${
              isActive("/") ? "text-camel font-semibold" : "text-bone/70 hover:text-camel"
            }`}
          >
            Home
          </Link>

          <div className="relative group">
            <button className="text-sm text-bone/70 hover:text-camel transition-colors">
              Category
            </button>

            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white border border-camel/20 shadow-lg shadow-ink/10 rounded-xl w-56 py-2">
              <Link to="/products" className="block px-4 py-2 text-sm text-ink/80 hover:bg-camel/10 hover:text-wine transition-colors">
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="block px-4 py-2 text-sm text-ink/80 hover:bg-camel/10 hover:text-wine transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/products"
            className={`text-sm transition-colors ${
              isActive("/products") ? "text-camel font-semibold" : "text-bone/70 hover:text-camel"
            }`}
          >
            Products
          </Link>
        </nav>
      </div>

      {/* Desktop right side */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 rounded-xl border border-bone/20 bg-transparent px-3 py-2 text-sm font-medium text-bone/80 hover:border-camel/50 hover:text-camel transition"
        >
          <ShoppingBag size={18} />
          <span>Cart</span>
          <span className="inline-flex min-w-6 h-6 items-center justify-center rounded-full bg-camel px-2 text-xs font-bold text-ink">
            {cartCount}
          </span>
        </Link>

        {!isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-bone/70 hover:text-camel transition">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-camel px-4 py-2 text-sm font-semibold text-ink hover:bg-camel/85 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-bone/50">
              Hi, <span className="font-semibold text-bone">{user?.name}</span>
            </span>
            <Link
              to="/profile"
              className={`text-sm transition-colors ${
                isActive("/profile") ? "text-camel font-semibold" : "text-bone/70 hover:text-camel"
              }`}
            >
              Profile
            </Link>
            <Link
              to="/orders"
              className={`text-sm transition-colors ${
                isActive("/orders") ? "text-camel font-semibold" : "text-bone/70 hover:text-camel"
              }`}
            >
              My Orders
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className={`text-sm transition-colors ${
                  isActive("/admin/dashboard") ? "text-camel font-semibold" : "text-bone/70 hover:text-camel"
                }`}
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="rounded-xl border border-wine-light/30 px-4 py-2 text-sm font-semibold text-wine-light hover:bg-wine/10 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile right side */}
      <div className="flex items-center gap-2 md:hidden">
        <Link
          to="/cart"
          onClick={closeMenu}
          className="relative inline-flex items-center justify-center rounded-xl border border-bone/20 bg-transparent p-2 text-bone/80"
        >
          <ShoppingBag size={20} />
          <span className="absolute -top-2 -right-2 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-camel px-1 text-[10px] font-bold text-ink">
            {cartCount}
          </span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-xl border border-bone/20 bg-transparent p-2 text-bone/80"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </div>

    {/* Mobile menu */}
    {menuOpen && (
      <div className="md:hidden border-t border-bone/10 py-4">
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            onClick={closeMenu}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/") ? "bg-camel text-ink" : "text-bone/80 hover:bg-bone/10"
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={closeMenu}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/products") ? "bg-camel text-ink" : "text-bone/80 hover:bg-bone/10"
            }`}
          >
            Products
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/login") ? "bg-camel text-ink" : "text-bone/80 hover:bg-bone/10"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/register") ? "bg-camel text-ink" : "text-bone/80 hover:bg-bone/10"
                }`}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-bone/15 bg-bone/5 px-4 py-3 mb-2">
                <p className="text-xs uppercase tracking-wide text-bone/50">Signed in as</p>
                <p className="font-semibold text-bone mt-1">{user?.name}</p>
                <p className="text-sm text-bone/50">{user?.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={closeMenu}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/profile") ? "bg-camel text-ink" : "text-bone/80 hover:bg-bone/10"
                }`}
              >
                Profile
              </Link>
              <Link
                to="/orders"
                onClick={closeMenu}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/orders") ? "bg-camel text-ink" : "text-bone/80 hover:bg-bone/10"
                }`}
              >
                My Orders
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/admin/dashboard") ? "bg-camel text-ink" : "text-bone/80 hover:bg-bone/10"
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="mt-2 rounded-xl border border-wine-light/30 px-3 py-2 text-left text-sm font-semibold text-wine-light hover:bg-wine/10 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    )}
  </div>
</header>
  );
}

export default Navbar;