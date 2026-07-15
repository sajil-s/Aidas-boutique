import API from "./api.js";

const getAllUsers = async () => {
  const response = await API.get("/admin/users");
  return response.data;
};

const getUserById = async (id) => {
  const response = await API.get(`/admin/users/${id}`);
  return response.data;
};

const updateUserRole = async (id, role) => {
  const response = await API.put(
    `/admin/users/${id}/role`,
    { role }
  );

  return response.data;
};

export {
  getAllUsers,getUserById,updateUserRole
};