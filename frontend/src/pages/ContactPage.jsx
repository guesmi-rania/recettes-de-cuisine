// src/pages/ContactPage.jsx
import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "../styles/ContactPage.css";

export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",  // Remplace par ton Service ID EmailJS
        "YOUR_TEMPLATE_ID", // Remplace par ton Template ID EmailJS
        form.current,
        "YOUR_USER_ID"      // Remplace par ton Public Key EmailJS
      )
      .then(
        () => {
          toast.success("✅ Message envoyé avec succès !");
          form.current.reset();
        },
        (error) => {
          toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
          console.error(error);
        }
      );
  };

  return (
    <div className="contact-container">
      <h2>Contactez-nous</h2>
      <div className="contact-content">

        {/* Formulaire de contact */}
        <div className="contact-form">
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="user_name" placeholder="Nom" required />
            <input type="email" name="user_email" placeholder="Email" required />
            <textarea name="message" placeholder="Votre message" required></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </div>

        {/* Informations de contact */}
        <div className="contact-info">
          <h3>Comment pouvons-nous vous aider ?</h3>
          <p><strong>Téléphone du Chef :</strong> +216 50 123 456</p>
          <p><strong>Email :</strong> lotfichef@gmail.com</p>

          <h4>Suivez-nous :</h4>
          <ul className="social-links">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF className="social-icon" />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram className="social-icon" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Carte Google Maps */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
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
