// src/pages/TastingPage.jsx
import React, { useState } from "react";
import "../styles/TastingList.css";

export default function TastingPage() {
  const [form, setForm] = useState({ name: "", date: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Demande de dégustation envoyée !");
    setForm({ name: "", date: "", message: "" });
  };

  return (
    <div className="tasting-container">
      <h2>Réserver une Dégustation</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Votre nom" value={form.name} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
