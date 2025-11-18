import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token =
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("authToken");

  // If user is already logged in → redirect to dashboard
  if (token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
