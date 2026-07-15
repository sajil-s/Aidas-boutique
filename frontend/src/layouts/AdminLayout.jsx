import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar.jsx";
import TopNavbar from "../components/admin/TopNavbar.jsx";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {sidebarOpen && (
  <div
    onClick={() => setSidebarOpen(false)}
    className="fixed inset-0 bg-black/40 z-40 md:hidden"
  />
)}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;