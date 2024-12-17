import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Registration from "../pages/Registration";
import UserProfile from "../pages/UserProfile";
import Products from "../pages/Products";
import Login from "../pages/Login";
import ProductDetailPage from "../pages/ProductDetailPage";
const AppRouter = () => {
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/registration", element: <Registration /> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/products", element: <Products /> },
    { path: "/login", element: <Login /> },
    { path: "/product/:id", element: <ProductDetailPage /> },
  ]);
  return routes;
};

export default AppRouter;
