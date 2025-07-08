// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const client = localStorage.getItem("client");

  if (!client) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
