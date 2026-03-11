// src/admin/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminNewsletter from "./AdminNewsletter";
import AdminLogin from "./AdminLogin";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" replace />;
}

function AppContent({ isLogged, setIsLogged }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  const handleLogin = () => {
    setIsLogged(true);
    navigate("/"); // ← redirige vers le dashboard après connexion
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <div className="admin-container" style={{ display: "flex", minHeight: "100vh", background: "#0d0f14" }}>
      {isLogged && !isLoginPage && <Sidebar onLogout={handleLogout} />}
      <div className="admin-main" style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
          <Route path="/" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><AdminProducts /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><AdminCategories /></PrivateRoute>} />
          <Route path="/newsletter" element={<PrivateRoute><AdminNewsletter /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("adminToken"));

  return (
    <Router>
      <AppContent isLogged={isLogged} setIsLogged={setIsLogged} />
    </Router>
  );
}