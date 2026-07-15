import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function PrivateRoute({children}){
    const {isAuthenticated,authLoading}=useAuth();
    if(authLoading){
        return <h1>Loading</h1>
    }
    return isAuthenticated?children:<Navigate to="/login"/>;

}
export default PrivateRoute;