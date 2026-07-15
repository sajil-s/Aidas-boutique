import API from "./api";

const loginUser=async(userData)=>{
    const response=await API.post("/auth/login",userData);
    return response.data;
}

const registerUser=async(userData)=>{
    const response=await API.post("/auth/register",userData);
    return response.data;
}

const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

const logoutUser=async()=>{
    const response=await API.post("/auth/logout");
    return response.data;
}

export {loginUser,registerUser,getProfile,logoutUser}