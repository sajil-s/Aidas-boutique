import { useEffect, useState } from "react";

import { getAllOrders } from "../../services/adminOrderService.js";
import OrdersTable from "../../components/admin/orders/OrdersTable.jsx";


function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Canty see Order",error);
    } finally {
      setLoading(false);
    }
  };

 

  if (loading) {
    return <h1>Loading...</h1>;
  }


const filteredOrders = orders.filter((order) =>
  order._id
    .slice(-6)
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>
      <div className="mb-6">
  <input
    type="text"
    placeholder="Search by Order ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-md border rounded-lg p-3"
  />
</div>

   {/* <OrdersTable orders={orders} /> */}
   <OrdersTable orders={filteredOrders} />
    </div>
  );
}

export default Orders;