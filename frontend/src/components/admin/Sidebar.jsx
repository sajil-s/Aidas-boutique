import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
   <aside
  className={`
    fixed md:static
    top-0 left-0
    h-full
    w-64
    bg-white
    border-r
    border-slate-200
    flex
    flex-col
    z-50
    transform
    transition-transform
    duration-300
    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }
    md:translate-x-0
  `}
>
     <div className="p-6 border-b flex items-center justify-between">

  <div>
    <h1 className="text-2xl font-bold">
      AIDAS
    </h1>

    <p className="text-sm text-slate-500">
      Admin Panel
    </p>
  </div>

  <button
    onClick={() => setSidebarOpen(false)}
    className="md:hidden"
  >
    <X size={24} />
  </button>

</div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/admin/dashboard" onClick={() => setSidebarOpen(false)}  className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" onClick={() => setSidebarOpen(false)}  className={linkClass}>
          <Package size={20} />
          Products
        </NavLink>

        <NavLink to="/admin/orders" onClick={() => setSidebarOpen(false)}  className={linkClass}>
          <ShoppingCart size={20} />
          Orders
        </NavLink>

        <NavLink to="/admin/users" onClick={() => setSidebarOpen(false)}  className={linkClass}>
          <Users size={20} />
          Users
        </NavLink>

         <NavLink to="/" onClick={() => setSidebarOpen(false)}  className={linkClass}>
          <LayoutDashboard size={20} />
          Home
        </NavLink>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
      
    </aside>
  );
}

export default Sidebar;