import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu"; // Composant de la sidebar pour mobile
import "../styles/Navbar.css"; // Importation du fichier CSS pour le style

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false); // Etat pour afficher/masquer la sidebar

  return (
    <>
      {/* Bannière d'ouverture de la boutique */}
      <div className="banner">
        <p>🎉 Découvrez notre nouvelle boutique en ligne ! 🎂 Livraison de pâtisseries fraîches et artisanales.</p>
      </div>

      <header className="navbar-container">
        <div className="menu-toggle" onClick={() => setShowSidebar(!showSidebar)}>
          <i className="fas fa-bars"></i> {/* Icône hamburger */}
        </div>

        {/* Logo centré */}
        <div className="logo">
          <img src="/images/logolou.png" alt="Logo" />
        </div>

        {/* Barre de recherche */}
        <div className="search-bar">
          <input type="text" placeholder="Rechercher une catégorie..." />
          <button><i className="fas fa-search"></i></button>
        </div>

        {/* Menu de navigation */}
        <div className="menu-right">
          {/* Liens internes vers les pages */}
          <Link to="/">Accueil</Link>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/panier"><i className="fas fa-shopping-cart"></i> Panier</Link>
          <Link to="/connexion"><i className="fas fa-user-circle"></i> Se connecter</Link>
        </div>

        {/* Sidebar si le menu hamburger est activé */}
        {showSidebar && <SidebarMenu closeSidebar={() => setShowSidebar(false)} />}
      </header>
    </>
  );
}

export default Navbar;
