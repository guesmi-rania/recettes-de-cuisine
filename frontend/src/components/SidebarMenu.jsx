import React from "react";
import { Link } from "react-router-dom";
import "../styles/SidebarMenu.css"; // Importation du fichier CSS pour la sidebar

function SidebarMenu({ closeSidebar }) {
  return (
    <div className="sidebar">
      <button className="close-btn" onClick={closeSidebar}>×</button>
      <h3>Catégories</h3>
      <ul>
        <li><Link to="/categorie/coin-cafe">☕ Coin café</Link></li>
        <li><Link to="/categorie/cuisson">🔥 Cuisson</Link></li>
        <li><Link to="/categorie/preparation">🥣 Préparation</Link></li>
        <li><Link to="/categorie/refrigeration">❄️ Réfrigération</Link></li>
        <li><Link to="/categorie/douchettes">🚿 Douchettes</Link></li>
      </ul>
    </div>
  );
}

export default SidebarMenu;
