import api from "./api.js";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (cartData) => {
  const response = await api.post("/cart", cartData);
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await api.patch(`/cart/${itemId}`, { quantity });
  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await api.delete(`/cart/${itemId}`);
  return response.data;
};