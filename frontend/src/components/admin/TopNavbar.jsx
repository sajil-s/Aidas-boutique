import { useAuth } from "../../context/AuthContext.jsx";
import { Menu } from "lucide-react";


function TopNavbar({ setSidebarOpen }) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
  <button
    onClick={() => setSidebarOpen(true)}
    className="md:hidden"
  >
    <Menu size={24} />
  </button>

  <div>
    <h1 className="text-xl md:text-2xl font-bold text-slate-800">
      Admin Dashboard
    </h1>

    <p className="text-sm text-slate-500">
      Welcome back, {user?.name}
    </p>
  </div>
</div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="font-semibold text-slate-800">
            {user?.name}
          </p>

          <p className="text-sm text-slate-500">
            {user?.email}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;