// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("client");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "0.6rem 1.2rem",
        backgroundColor: "#e44d7d",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        marginTop: "1rem",
      }}
    >
      Déconnecter
    </button>
  );
}

export default LogoutButton;
