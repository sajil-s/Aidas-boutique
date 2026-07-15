import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/adminService.js";
import StatCard from "../../components/admin/StatCard.jsx";
import RecentOrdersTable from "../../components/admin/RecentOrdersTable.jsx";
import LowStockTable from "../../components/admin/LowStockTable.jsx";


function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

return (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-slate-800">
      Dashboard
    </h1>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Users"
        value={dashboardData.totalUsers}
      />

      <StatCard
        title="Total Products"
        value={dashboardData.totalProducts}
      />

      <StatCard
        title="Total Orders"
        value={dashboardData.totalOrders}
      />

      <StatCard
        title="Revenue"
        value={`₹${dashboardData.totalRevenue}`}
      />
    </div>
    <RecentOrdersTable
    orders={dashboardData.recentOrders}
/>
<LowStockTable
  products={dashboardData.lowStockProducts}
/>
  </div>
);
}

export default Dashboard;