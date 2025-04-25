import React, { useState } from "react";
import "../styles/AdminLogin.css"; // Ton style ici
import AdminDashboard from "./AdminDashboard"; // Import du tableau de bord

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  if (authenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="admin-login">
      <h2>Connexion Administrateur</h2>
      <form onSubmit={handleLogin}>
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default AdminLogin;
