import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="py-10 text-center text-lg">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;