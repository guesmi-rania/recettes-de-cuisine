import React, { useState } from "react";
import axios from "axios";
import "../styles/ClientAuth.css";

const BASE_URL = import.meta.env.VITE_API_URL;

function ClientAuth() {
  const [activeTab, setActiveTab] = useState("login");

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Connexion client
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log("Réponse connexion :", response);

      if (response.status === 200) {
        alert("🎉 Connexion réussie !");
        localStorage.setItem("clientToken", response.data.token);
        // Tu peux rediriger ici si tu veux
        // window.location.href = "/";
      }
    } catch (error) {
      console.error("Erreur connexion :", error.response?.data || error.message);
      alert(`❌ Erreur lors de la connexion : ${error.response?.data?.message || error.message}`);
    }
  };

  // Inscription client
  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerPassword !== confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      console.log("Réponse inscription :", response);

      if (response.status === 201 || response.status === 200) {
        alert("✅ Inscription réussie !");
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setConfirmPassword("");
        setActiveTab("login");
      }
    } catch (error) {
      console.error("Erreur inscription :", error.response?.data || error.message);
      alert(`❌ Erreur lors de l'inscription : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="client-auth">
      <div className="tabs">
        <div
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Connexion
        </div>
        <div
          className={`tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Inscription
        </div>
      </div>

      {activeTab === "login" ? (
        <form onSubmit={handleLogin}>
          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Se connecter</button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <label>Nom *</label>
          <input
            type="text"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
          />

          <label>Email *</label>
          <input
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />

          <label>Mot de passe *</label>
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />

          <label>Confirmer le mot de passe *</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">S'inscrire</button>
        </form>
      )}
    </div>
  );
}

export default ClientAuth;
