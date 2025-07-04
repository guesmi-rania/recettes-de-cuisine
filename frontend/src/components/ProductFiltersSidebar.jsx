import React from "react";
import "../styles/ProductFiltersSidebar.css";

export default function ProductFiltersSidebar({ onFilter }) {
  return (
    <aside className="sidebar">
      <h3>Catégories</h3>
      <ul>
        <li onClick={() => onFilter("all")}>Tous</li>
        <li onClick={() => onFilter("Gâteaux")}>Gâteaux</li>
        <li onClick={() => onFilter("Viennoiseries")}>Viennoiseries</li>
        <li onClick={() => onFilter("Salés")}>Salés</li>
        <li onClick={() => onFilter("Pièces Montées")}>Pièces Montées</li>
      </ul>
    </aside>
  );
}
