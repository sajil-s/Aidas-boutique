import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

import { registerUser } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

function Register(){
    const navigate=useNavigate();
    const {login}=useAuth();

    const[formData,setFormData]=useState(
       { name:"",
        email:"",
        password:""
       }
    );
    const [loading,setLoading]=useState(false);
    const handleChange=(e)=>{
        setFormData((prev)=>({
            ...prev,[e.target.name]:e.target.value,
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            setLoading(true);
            const userData=await registerUser(formData);
            login(userData);
            toast.success("Account created successfully");
            navigate("/");
        }catch(error){
            toast.error(
                error?.response?.data?.message || "registration failed"
            );
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="flex justify-center items-center">
            <div className=" max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">
                Rgister
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
          required
                 />
                  <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

            </form>

        </div>
        </div>
        
    )
}

export default Register;