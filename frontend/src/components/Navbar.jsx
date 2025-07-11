import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import {
  FaUserCircle,
  FaShoppingBag,
  FaRegHeart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/loglou.png";
import Categories from "./Categories";

function Navbar({ cart = [], wishlist = [] }) {
  const [showCategories, setShowCategories] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const navigate = useNavigate();

  // Chargement du prénom depuis localStorage
  useEffect(() => {
    const storedClient = JSON.parse(localStorage.getItem("client"));
    if (storedClient?.name) {
      const prenom = storedClient.name.split(" ")[0];
      setFirstName(prenom);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("client");
    localStorage.removeItem("token");
    setFirstName(null);
    navigate("/login");
  };

  return (
    <>
      <div className="banner">
        <p>🎉 Découvrez notre nouvelle boutique en ligne ! 🎂 Livraison de pâtisseries artisanales.</p>
      </div>

      <header className="navbar-container">
        <div className="navbar-wrapper">
          {/* Gauche */}
          <div className="navbar-left">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo Mr. Chef" />
            </Link>

            <div className="categories-dropdown">
              <button onClick={() => setShowCategories(!showCategories)}>
                <FaBars className="menu-icon" /> Toutes les catégories <FaChevronDown />
              </button>
              {showCategories && (
                <div className="categories-list open">
                  <Categories onClickCategory={() => setShowCategories(false)} />
                </div>
              )}
            </div>

            <nav className="menu-links">
              <Link to="/produits">Produits</Link>
              <Link to="/dégustation">Dégustation</Link>
              <Link to="/pieces-montees">Pièces Montées</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          {/* Droite */}
          <div className="navbar-right">
            {firstName ? (
              <div className="top-item user-info">
                <FaUserCircle className="icon" />
                <div className="user-text">
                  <span className="top-bold">Mon compte</span>
                  <span className="welcome-message">Bienvenue {firstName}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout} aria-label="Déconnexion">
                  <FaSignOutAlt className="logout-icon" />
                </button>
              </div>
            ) : (
              <div className="top-item">
                <FaUserCircle className="icon" />
                <Link to="/login" className="top-bold">Mon compte</Link>
              </div>
            )}

            <Link to="/wishlist" className="top-item" style={{ position: "relative" }}>
              <FaRegHeart className="icon" />
              {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
            </Link>

            <Link to="/panier" className="top-item" style={{ position: "relative" }}>
              <FaShoppingBag className="icon" />
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </Link>
          </div>

          {/* Menu burger mobile */}
          <div className="menu-toggle" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
          </div>
        </div>

        {/* Menu mobile */}
        {showSidebar && (
          <div className="mobile-menu">
            <nav className="menu-links">
              <Link to="/produits" onClick={() => setShowSidebar(false)}>Produits</Link>
              <Link to="/dégustation" onClick={() => setShowSidebar(false)}>Dégustation</Link>
              <Link to="/pieces-montees" onClick={() => setShowSidebar(false)}>Pièces Montées</Link>
              <Link to="/contact" onClick={() => setShowSidebar(false)}>Contact</Link>
            </nav>

            {firstName ? (
              <div className="top-item user-info">
                <FaUserCircle className="icon" />
                <div className="user-text">
                  <span className="top-bold">Mon compte</span>
                  <span className="welcome-message">Bienvenue {firstName}</span>
                </div>
                <button
                  className="logout-btn"
                  onClick={() => {
                    handleLogout();
                    setShowSidebar(false);
                  }}
                  aria-label="Déconnexion"
                >
                  <FaSignOutAlt className="logout-icon" />
                </button>
              </div>
            ) : (
              <div className="top-item">
                <FaUserCircle className="icon" />
                <Link to="/login" className="top-bold" onClick={() => setShowSidebar(false)}>
                  Mon compte
                </Link>
              </div>
            )}

            <Link to="/wishlist" className="top-item" onClick={() => setShowSidebar(false)}>
              <FaRegHeart className="icon" />
              {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
            </Link>

            <Link to="/panier" className="top-item" onClick={() => setShowSidebar(false)}>
              <FaShoppingBag className="icon" />
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
