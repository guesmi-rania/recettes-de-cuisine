// src/admin/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

// Composant interne pour accéder à useLocation
function AppContent({ isLogged, setIsLogged }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLogged(false);
  };

  return (
    <div className="admin-container" style={{ display: "flex", minHeight: "100vh", background: "#0d0f14" }}>
      {/* Sidebar visible uniquement si connecté ET pas sur /login */}
      {isLogged && !isLoginPage && <Sidebar onLogout={handleLogout} />}

      <div className="admin-main" style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/login" element={<AdminLogin onLogin={() => setIsLogged(true)} />} />
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