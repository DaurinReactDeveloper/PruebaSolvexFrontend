import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import AdminProfile from "../pages/AdminProfile";
import SellerProfile from "../pages/SellerProfile";
import Products from "../pages/Products";
import SearchProducts from "../pages/SearchProducts";
import { PrivateRoute } from "./PrivateRoutes";
import { PublicRoute } from "./PublicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <PublicRoute element={<Home />} /> },
      {
        path: "admin",
        element: (
          <PrivateRoute element={<AdminProfile />} requiredRole="Admin" />
        ),
      },
      {
        path: "seller",
        element: (
          <PrivateRoute element={<SellerProfile />} requiredRole="Seller" />
        ),
      },

      { path: "products", element: <PrivateRoute element={<Products />} /> },
      {
        path: "search",
        element: <PrivateRoute element={<SearchProducts />} />,
      },
    ],
  },
]);

export default router;
