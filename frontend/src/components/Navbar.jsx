import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import logo from "../assets/loglou.png";

function Navbar({ cart = [], wishlist = [] }) {
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

        {/* 🧁 Logo */}
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
            <Link to="/login" className="top-bold">
              Mon compte
            </Link>
          </div>

          {/* ❤️ Wishlist */}
          <Link to="/wishlist" className="top-item" style={{ position: "relative" }}>
            <FaHeart className="icon" />
            {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
          </Link>

          {/* 🛒 Panier */}
          <Link to="/panier" className="top-item" style={{ position: "relative" }}>
            <FaShoppingCart className="icon" />
            <span className="panier-label">Panier</span>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>
        </div>

        {/* 📱 Sidebar mobile */}
        {showSidebar && <SidebarMenu closeSidebar={() => setShowSidebar(false)} />}
      </header>
    </>
  );
}

export default Navbar;
