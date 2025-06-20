import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaUser, FaShoppingCart, FaPhone } from "react-icons/fa";
import logo from "../assets/loglou.png";

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* 🎉 Bannière promo */}
      <div className="banner">
        <p>🎉 Découvrez notre nouvelle boutique en ligne ! 🎂 Livraison de pâtisseries fraîches et artisanales.</p>
      </div>

      {/* 🚀 Barre principale */}
      <header className="navbar-container">
        {/* 🍔 Menu mobile */}
        <div className="menu-toggle" onClick={() => setShowSidebar(!showSidebar)}>
          <i className="fas fa-bars"></i>
        </div>

               {/* 🧁 Ligne 1 : Logo + recherche + icônes */}
      
        <div className="logo-zone">
          <Link to="/" className="logo-link"> 
            <div className="brand-text">
            <img src={logo} alt="Logo Lotfi Chef" />
              <p>Le goût raffiné de la pâtisserie tunisienne</p>
            </div>
          </Link>
        </div>


        {/* 🔗 Liens */}
        <div className="menu-right">
          <Link to="/produits">Produits</Link>
          <Link to="/dégustation">Dégustation</Link>
          <Link to="/pieces-montees">Pièces Montées</Link>
          <Link to="/contact">Contact</Link>

         
         {/* 👤 Mon compte */}
         <div className="top-item">
         <FaUser className="icon" />
         <Link to="/login" className="top-bold">Mon compte</Link>
        </div>

       {/* 🛒 Panier */}
      <div className="top-item">
        <FaShoppingCart className="icon" />
          <span className="panier-label">Panier</span>
         <span className="cart-badge">0</span>
    </div>


        </div>

        {/* 📱 Sidebar mobile */}
        {showSidebar && <SidebarMenu closeSidebar={() => setShowSidebar(false)} />}
      </header>
    </>
  );
}

export default Navbar;
