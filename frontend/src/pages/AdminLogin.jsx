import React, { useState } from "react";
import "../styles/AdminLogin.css";

export default function MonCompte() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const canLogin = username.trim() !== "" && password.trim() !== "";
  const canRegister =
    registerUsername.trim() !== "" &&
    registerEmail.trim() !== "" &&
    registerPassword.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body = isLogin
      ? { username, password }
      : { username: registerUsername, email: registerEmail, password: registerPassword };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        if (isLogin && data.token) {
          // Exemple : stocker token et rediriger
          localStorage.setItem("token", data.token);
          // window.location.href = "/admin-dashboard"; // décommente si tu as une route admin
        }

        if (!isLogin) {
          // Reset champs inscription
          setRegisterUsername("");
          setRegisterEmail("");
          setRegisterPassword("");
        }
      } else {
        alert(data.message || "Erreur serveur");
      }
    } catch (error) {
      alert("Erreur réseau ou serveur");
      console.error(error);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>{isLogin ? "Connexion Admin" : "Inscription Admin"}</h2>
      <div className="tabs">
        <div
          onClick={() => setIsLogin(true)}
          className={`tab ${isLogin ? "active" : ""}`}
        >
          Se connecter
        </div>
        <div
          onClick={() => setIsLogin(false)}
          className={`tab ${!isLogin ? "active" : ""}`}
        >
          S’inscrire
        </div>
      </div>

      {isLogin ? (
        <form onSubmit={handleSubmit}>
          <label>Nom d’utilisateur ou e-mail *</label>
          <input
            type="text"
            placeholder="Entrez votre nom d’utilisateur ou e-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Mot de passe *</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Se souvenir de moi
          </label>

          <button type="submit" disabled={!canLogin}>
            Se connecter
          </button>

          <div className="forgot-password">Mot de passe oublié ?</div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Nom d’utilisateur *</label>
          <input
            type="text"
            placeholder="Choisissez un nom d’utilisateur"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            required
          />

          <label>Adresse e-mail *</label>
          <input
            type="email"
            placeholder="Entrez votre adresse e-mail"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />

          <label>Mot de passe *</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={!canRegister}>
            S’inscrire
          </button>
        </form>
      )}
    </div>
  );
}
