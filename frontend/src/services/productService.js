

import API from "./api.js";

const getProducts = async (filters = {}) => {
  const response = await API.get("/products", {
    params: filters,
  });

  return response.data;
};

const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

const getCategories = async () => {
  const response = await API.get("/products/categories");
  return response.data;
};

export { getProducts, getProductById,getCategories };