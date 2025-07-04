import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/loglou.png"; // adapte le chemin si besoin
import "../styles/Navbar.css";

function Navbar({ cart = [], wishlist = [] }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Bannière promo */}
      <div className="banner">
        🎉 Découvrez notre nouvelle boutique en ligne ! 🎂 Livraison de pâtisseries fraîches et artisanales.
      </div>

      {/* Navbar principale */}
      <header className="navbar-container">
        {/* Menu burger mobile */}
        <div className="menu-toggle" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        {/* Logo */}
        <div className="logo-zone">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo Lotfi Chef" className="logo-img" />
            <p className="brand-text">Le goût raffiné de la pâtisserie tunisienne</p>
          </Link>
        </div>

        {/* Liens principaux */}
        <nav className={`menu-right ${showSidebar ? "show" : ""}`}>
          <Link to="/produits" onClick={() => setShowSidebar(false)}>Produits</Link>
          <Link to="/dégustation" onClick={() => setShowSidebar(false)}>Dégustation</Link>
          <Link to="/pieces-montees" onClick={() => setShowSidebar(false)}>Pièces Montées</Link>
          <Link to="/contact" onClick={() => setShowSidebar(false)}>Contact</Link>

          <Link to="/login" className="top-item" onClick={() => setShowSidebar(false)}>
            <FaUser className="icon" /> Mon compte
          </Link>

          <Link to="/wishlist" className="top-item" onClick={() => setShowSidebar(false)} style={{ position: "relative" }}>
            <FaHeart className="icon" />
            {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
          </Link>

          <Link to="/panier" className="top-item" onClick={() => setShowSidebar(false)} style={{ position: "relative" }}>
            <FaShoppingCart className="icon" />
            <span className="panier-label">Panier</span>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
