// src/components/ClientRegister.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/ClientRegister.css"; // facultatif si tu as un style

const BASE_URL = "https://recettes-de-cuisine.onrender.com"; // ⚠️ Remplace par ton backend réel si différent

function ClientRegister() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/clients/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        alert("✅ Inscription réussie !");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      if (error.response) {
        alert(`❌ Erreur : ${error.response.data.message}`);
      } else {
        alert("❌ Erreur réseau. Veuillez réessayer.");
      }
      console.error("Erreur lors de l'inscription :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-register">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Confirmer le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Enregistrement..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default ClientRegister;
