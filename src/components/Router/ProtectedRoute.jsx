import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return localStorage.getItem("user_Uid") ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
