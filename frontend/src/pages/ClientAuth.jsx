import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ClientAuth.css";

const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

export default function ClientAuth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Inscription
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 Connexion réussie !");
        localStorage.setItem("clientToken", data.token);

        const user = { email, isNew: false };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        navigate("/commandes");
      } else {
        alert(`❌ Erreur : ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur lors de la connexion. Veuillez réessayer.");
    }
  };

  // Inscription
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.status === 201 || response.ok) {
        alert("✅ Inscription réussie !");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });

        const user = { email: formData.email, isNew: true };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        navigate("/welcome");
      } else {
        alert(`❌ Erreur : ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-auth-container">
      <h2>{isLogin ? "Connexion" : "Créer un compte"}</h2>

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
        <form onSubmit={handleLogin} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Se connecter</button>
          <p>Pas de compte ? Cliquez sur "S’inscrire" ci-dessus.</p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="auth-form">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            placeholder="Entrez votre nom"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Entrez votre email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Enregistrement..." : "S’inscrire"}
          </button>
          <p>Déjà inscrit ? Cliquez sur "Se connecter" ci-dessus.</p>
        </form>
      )}
    </div>
  );
}
