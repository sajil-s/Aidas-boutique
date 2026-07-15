import API from "./api.js";

const getAllProducts = async () => {
  const response = await API.get("/admin/products");
  return response.data;
};

const createProduct = async (productData) => {
  const response = await API.post(
    "/admin/products",
    productData
  );

  return response.data;
};

const updateProduct = async (id, productData) => {
  const response = await API.put(
    `/admin/products/${id}`,
    productData
  );

  return response.data;
};

// We'll use this later
const deleteProduct = async (id) => {
  const response = await API.delete(
    `/admin/products/${id}`
  );

  return response.data;
};

const toggleProductStatus = async (id, isActive) => {
  const response = await API.put(
    `/admin/products/${id}`,
    { isActive }
  );

  return response.data;
};

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus
};