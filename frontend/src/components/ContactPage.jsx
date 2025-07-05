// src/pages/ContactPage.jsx
import React from "react";
import "../styles/ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-container">
      <h2>Contactez-nous</h2>
      <form>
        <input type="text" placeholder="Nom" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Votre message" required></textarea>
        <button type="submit">Envoyer</button>
      </form>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?..."
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
    </div>
  );
}
