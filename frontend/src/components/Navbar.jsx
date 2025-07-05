import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaUser, FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/loglou.png";

function Navbar({ cart = [], wishlist = [] }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="banner">
        <p>🎉 Découvrez notre nouvelle boutique en ligne ! 🎂 Livraison de pâtisseries artisanales.</p>
      </div>

      <header className="navbar-container">
        <div className="menu-toggle" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
        </div>

        <div className="logo-zone">
          <Link to="/" className="logo-link">
            <div className="brand-text">
              <img src={logo} alt="Logo Lotfi Chef" />
              <p>Le goût raffiné de la pâtisserie tunisienne</p>
            </div>
          </Link>
        </div>

        <nav className={`menu-right ${showSidebar ? "show" : ""}`}>
          <Link to="/produits" onClick={() => setShowSidebar(false)}>Produits</Link>
          <Link to="/dégustation" onClick={() => setShowSidebar(false)}>Dégustation</Link>
          <Link to="/pieces-montees" onClick={() => setShowSidebar(false)}>Pièces Montées</Link>
          <Link to="/contact" onClick={() => setShowSidebar(false)}>Contact</Link>

          <div className="top-item">
            <FaUser className="icon" />
            <Link to="/login" className="top-bold" onClick={() => setShowSidebar(false)}>
              Mon compte
            </Link>
          </div>

          <Link to="/wishlist" className="top-item" style={{ position: "relative" }} onClick={() => setShowSidebar(false)}>
            <FaHeart className="icon" />
            {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
          </Link>

          <Link to="/panier" className="top-item" style={{ position: "relative" }} onClick={() => setShowSidebar(false)}>
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
