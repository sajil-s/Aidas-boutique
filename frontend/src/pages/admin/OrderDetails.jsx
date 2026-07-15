import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomerCard from "../../components/admin/orders/CustomerCard.jsx";
import ShippingCard from "../../components/admin/orders/ShippingCard.jsx";

import OrderItemsTable from "../../components/admin/orders/OrderItemsTable.jsx";
import OrderStatusForm from "../../components/admin/orders/OrderStatusForm.jsx";
import PaymentSummary from "../../components/admin/orders/PaymentSummary.jsx";
import { getOrderById } from "../../services/adminOrderService.js";


function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error)  {
  setError(error.response?.data?.message || "Something went wrong");
}
    finally {
      setLoading(false);
    }
  };

  

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
  return <h1>{error}</h1>;
}

if (!order) {
  return <h1>Order not found</h1>;
}



  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Order Details
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <CustomerCard user={order.user} />

  <ShippingCard
    shippingAddress={order.shippingAddress}
  />
</div>
<div className="mt-6">
  <OrderItemsTable
    orderItems={order.orderItems}
  />
</div>

<div className="mt-6">
  <PaymentSummary
    order={order}
  />
</div>

<div className="mt-6">
  <OrderStatusForm
    order={order}
    fetchOrder={fetchOrder}
  />
</div>
    </div>
  );
}

export default OrderDetails;