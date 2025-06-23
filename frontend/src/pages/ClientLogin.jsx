import React, { useState } from "react";
import "../styles/ClientLogin.css";

const BASE_URL = "https://recettes-de-cuisine.onrender.com";

function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/clients/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 Connexion réussie !");
        // Tu peux stocker le token ou rediriger ici
        localStorage.setItem("clientToken", data.token);
        // Exemple de redirection : window.location.href = "/"; 
      } else {
        alert(`❌ Erreur : ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur lors de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="client-login">
      <h2>Connexion Client</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
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
