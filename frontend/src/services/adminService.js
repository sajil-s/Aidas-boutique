import API from "./api";

// Dashboard
const getDashboardStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

export { getDashboardStats };