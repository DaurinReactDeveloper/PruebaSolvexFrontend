import { Navigate } from "react-router";
import authService from "../utils/token";

export function PublicRoute({ element }) {
  const isAuthenticated = authService.isTokenValid();
  const userRole = authService.getUserRole();

  if (isAuthenticated) {
    if (userRole === "Admin") {
      return <Navigate to="/admin" replace />;
    } else if (userRole === "Seller") {
      return <Navigate to="/seller" replace />;
    } else {
      return <Navigate to="/products" replace />;
    }
  }

  return element;
}
