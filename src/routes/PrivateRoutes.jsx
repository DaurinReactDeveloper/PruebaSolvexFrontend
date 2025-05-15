import { Navigate } from "react-router";
import authService from "../utils/token";

export function PrivateRoute({ element, requiredRole }) {
  const isAuthenticated = authService.isTokenValid();
  const userRole = authService.getUserRole();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    const redirectPath =
      userRole === "Admin" ? "/admin" : userRole === "Seller" ? "/seller" : "/";
    return <Navigate to={redirectPath} replace />;
  }

  return element;
}
