import React from "react"; // <-- Ajoute cette ligne
import { FaCreditCard, FaTags, FaCheckCircle, FaTruck } from "react-icons/fa";
import "../styles/Features.css";

export default function FeaturesStylish() {
  const featuresData = [
    {
      icon: <FaCreditCard />,
      title: "Paiement sécurisé",
      description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.",
      bg: "feature-blue",
    },
    {
      icon: <FaTags />,
      title: "Dernières offres",
      description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.",
      bg: "feature-green",
    },
    {
      icon: <FaCheckCircle />,
      title: "Qualité garantie",
      description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.",
      bg: "feature-orange",
    },
    {
      icon: <FaTruck />,
      title: "Livraison à domicile",
      description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.",
      bg: "feature-red",
    },
  ];

  return (
    <section className="features-stylish-section">
      <div className="features-stylish-container">
        {featuresData.map((feature, index) => (
          <div className={`feature-card ${feature.bg}`} key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
