import API from "./api.js";

const getAllOrders = async () => {
  const response = await API.get("/admin/orders");
  return response.data;
};

const updateOrderStatus = async (
  orderId,
  orderData
) => {
  const response = await API.put(
    `/admin/orders/${orderId}/status`,
    orderData
  );

  return response.data;
};



const getOrderById = async (id) => {
  const response = await API.get(`/admin/orders/${id}`);
  return response.data;
};



export {
  getAllOrders,
  updateOrderStatus,getOrderById
};