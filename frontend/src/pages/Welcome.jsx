// src/pages/Welcome.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const [client, setClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedClient = JSON.parse(localStorage.getItem("client"));
    if (!storedClient) {
      navigate("/login");
    } else {
      setClient(storedClient);
    }
  }, [navigate]);

  const firstName = client?.name?.split(" ")[0] || "";

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Bienvenue {firstName} !</h1>
        <p>Nous sommes ravis de vous retrouver. Que souhaitez-vous faire ?</p>

        <img
          src="/images/welcome-dessert.jpg" // mets une belle image dans public/images/
          alt="Douceurs du chef"
          className="welcome-image"
        />

        <div className="welcome-buttons">
          <Link to="/produits" className="btn-primary">Découvrir nos produits</Link>
          <Link to="/commandes" className="btn-secondary">Voir mes commandes</Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
