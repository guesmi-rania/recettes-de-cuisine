import React, { useState } from "react";
import "../styles/ClientLogin.css";

function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ⚠️ À remplacer plus tard par un appel à une API
    if (email === "client@example.com" && password === "client123") {
      alert("Connexion réussie !");
      // rediriger ou afficher le tableau de bord client
    } else {
      alert("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="client-login">
      <h2>Connexion Client</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default ClientLogin;
