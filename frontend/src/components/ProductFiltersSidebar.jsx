// src/components/ProductFiltersSidebar.jsx
import React, { useState } from "react";
import "../styles/ProductFiltersSidebar.css";

export default function ProductFiltersSidebar({ onFilter, onPriceChange }) {
  const [price, setPrice] = useState(100);

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    onPriceChange(newPrice);
  };

  return (
    <div className="filters-sidebar">
      <h3>Catégories</h3>
      <ul>
        <li onClick={() => onFilter("all")}>Tous</li>
        <li onClick={() => onFilter("Gâteaux")}>Gâteaux</li>
        <li onClick={() => onFilter("Viennoiseries")}>Viennoiseries</li>
        <li onClick={() => onFilter("Salés")}>Salés</li>
      </ul>

      <h3>Filtrer par prix</h3>
      <input
        type="range"
        min="0"
        max="100"
        value={price}
        onChange={handlePriceChange}
      />
      <p>Prix maximum : {price} Dt</p>
    </div>
  );
}
