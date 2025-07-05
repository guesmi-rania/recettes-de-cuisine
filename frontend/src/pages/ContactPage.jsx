import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "../styles/ContactPage.css";

export default function ContactPage() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const { user_name, user_email, message } = formData;
    if (!user_name || !user_email || !message) {
      toast.error("❌ Veuillez remplir tous les champs.");
      return;
    }

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_USER_ID"
      )
      .then(() => {
        toast.success("✅ Message envoyé avec succès !");
        form.current.reset();
        setFormData({ user_name: "", user_email: "", message: "" });
      })
      .catch((error) => {
        toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
        console.error(error);
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-content">

        {/* Formulaire de contact */}
        <div className="contact-form">
          <h2>Contactez-nous</h2>

          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="user_name"
              placeholder="Nom"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Envoyer un message</button>
          </form>
        </div>

        {/* Informations de contact */}
        <div className="contact-info">
          <h2>Comment pouvons-nous vous aider ?</h2>
          <p><strong>Téléphone du Chef :</strong> +216 20 828 055</p>
          <p><strong>Email :</strong> lotfichef@gmail.com</p>
          <p><strong>Localisation :</strong> n°11 rue Kawefel Borj Louzir Ariana</p>
        
          <h4>Suivez-nous :</h4>
          <ul className="social-links">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="social-icon animated-icon" />
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="social-icon animated-icon" />
                Instagram
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Carte Google Maps */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6456956.935024549!2d7.204370499999999!3d33.886915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1255f210b48d138d%3A0x7530c3ce67f77f35!2sTunisie!5e0!3m2!1sfr!2stn!4v1688532689513!5m2!1sfr!2stn"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Carte Tunisie"
        />
      </div>
    </div>
  );
}
