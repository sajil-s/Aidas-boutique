import { createContext,useContext,useState,useEffect } from "react";

import { getProfile,logoutUser } from "../services/authService.js";


const AuthContext=createContext();

function AuthProvider({children}){
    const [user,setUser]=useState(null);
    const [authLoading,setLoading]=useState(true);


const checkAuth = async () => {
  try {
    const userData = await getProfile();
    setUser(userData);
  } catch (error) {
    if (error.response?.status === 401) {
      setUser(null);
    } else {
      console.error("Auth check failed:", error);
      setUser(null);
    }
  } finally {
    setLoading(false);
  }
};


    useEffect(()=>{
        checkAuth();
    },[]);

    const logout=async()=>{
        try{
            await logoutUser();
            setUser(null);
        }catch(error){
            console.error("Logout failed",error)
        }
    }
   
    const login = (userData) => {
  setUser(userData);
};
    const value={
        user,setUser,authLoading,
        isAuthenticated: !! user,
       login, logout,
    };

    return(
        <AuthContext.Provider value={value} >
            {children}

        </AuthContext.Provider>
    )
}


function useAuth(){
    return useContext(
        AuthContext
    );
}

export {useAuth,AuthProvider}


