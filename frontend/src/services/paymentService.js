import api from "./api.js";

export const createRazorpayOrder = async (orderId) => {
  const response = await api.post(`/payments/create/${orderId}`);
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post("/payments/verify", paymentData);
  return response.data;
};