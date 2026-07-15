import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function AdminRoute({children}){
    const {user,authLoading}=useAuth();
    if(authLoading){
        return <h1>Loading</h1>
    }
    return user?.role==="admin"?children:<Navigate to="/"/>;

}
export default AdminRoute;