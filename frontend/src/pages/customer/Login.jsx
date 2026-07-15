import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

import { loginUser } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

function Login(){
  const navigate=useNavigate();
  const {login}=useAuth();

  const [formData,setFormData]=useState({
    email:"",
    password:""
  });

  const [loading,setLoading]=useState(false);

  const handleChange=(e)=>{
    setFormData({
        ...formData,[e.target.name]:e.target.value
    });
  };
  const handleSubmit=async (e)=>{
         e.preventDefault();

         try{
            setLoading(true);

            const userData= await loginUser(
                formData
            );
            login(userData);
            toast.success(
                "login cmpleated"
            );

            navigate("/")
         }catch(error){
            toast.error(
                error?.response?.data?.message || "login failed"
            );
         }finally{
            setLoading(false);
         }
  };

return (
  <div className="flex justify-center items-center min-h-[70vh]">
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;