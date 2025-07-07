import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { FaUserCircle, FaShoppingBag, FaRegHeart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../assets/loglou.png";
import Categories from "./Categories";

function Navbar({ cart = [], wishlist = [] }) {
  const [showCategories, setShowCategories] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("clientToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="banner">
        <p>🎉 Découvrez notre nouvelle boutique en ligne ! 🎂 Livraison de pâtisseries artisanales.</p>
      </div>

      <header className="navbar-container">
        <div className="navbar-wrapper">

          {/* Partie gauche */}
          <div className="navbar-left">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo Mr. Chef" />
            </Link>

            <div className="categories-dropdown">
              <button onClick={() => setShowCategories(!showCategories)}>
                <FaBars className="menu-icon" /> Toutes les catégories <FaChevronDown />
              </button>
              {showCategories && (
                <div className={`categories-list ${showCategories ? "open" : ""}`}>
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

          {/* Partie droite avec nouvelles icônes */}
          <div className="navbar-right">
            {user ? (
              <div className="top-item">
                <FaUserCircle className="icon" />
                <span className="top-bold" style={{ cursor: "pointer" }} onClick={handleLogout}>
                  Se déconnecter
                </span>
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

          {/* Menu mobile */}
          <div className="menu-toggle" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
          </div>
        </div>

        {/* Menu mobile responsive */}
        {showSidebar && (
          <div className="mobile-menu">
            <nav className="menu-links">
              <Link to="/produits" onClick={() => setShowSidebar(false)}>Produits</Link>
              <Link to="/dégustation" onClick={() => setShowSidebar(false)}>Dégustation</Link>
              <Link to="/pieces-montees" onClick={() => setShowSidebar(false)}>Pièces Montées</Link>
              <Link to="/contact" onClick={() => setShowSidebar(false)}>Contact</Link>
            </nav>

            {user ? (
              <div className="top-item">
                <FaUserCircle className="icon" />
                <span
                  className="top-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleLogout();
                    setShowSidebar(false);
                  }}
                >
                  Se déconnecter
                </span>
              </div>
            ) : (
              <div className="top-item">
                <FaUserCircle className="icon" />
                <Link to="/login" className="top-bold" onClick={() => setShowSidebar(false)}>Mon compte</Link>
              </div>
            )}

            <Link to="/wishlist" className="top-item" style={{ position: "relative" }} onClick={() => setShowSidebar(false)}>
              <FaRegHeart className="icon" />
              {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
            </Link>

            <Link to="/panier" className="top-item" style={{ position: "relative" }} onClick={() => setShowSidebar(false)}>
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
