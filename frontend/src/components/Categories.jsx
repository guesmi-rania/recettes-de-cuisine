// src/components/Categories.jsx
import React, { useState } from "react";
import "../styles/Categories.css"; 
import { FaUtensils,        // 🍽️ pour Cuisine
  FaBirthdayCake,    // 🎂 pour Pâtisserie
  FaBreadSlice,      // 🍞 pour Boulangerie
  FaIceCream,        // 🍨 pour Chocolatier (garde)
  FaShoppingBasket,  // 🛒 pour Épicerie
  FaBookOpen,        // 📖 pour Recettes
  FaStar             // ⭐ pour Univers du Chef
} from "react-icons/fa";
function Categories() {
  const categories = [
    { name: "Cuisine", icon: <FaUtensils /> },
    { name: "Pâtisserie", icon: <FaBirthdayCake /> },
    { name: "Boulangerie", icon: <FaBreadSlice /> },
    { name: "Chocolatier", icon: <FaIceCream /> },
    { name: "Épicerie", icon: <FaShoppingBasket /> },
    { name: "Recettes", icon: <FaBookOpen /> },
    { name: "L'univers de Chef Lotfi", icon: <FaStar /> },
  ];

  return (
    <div className="categories-dropdown">
      <div className="dropdown-header">Top Categories</div>
      <ul className="dropdown-list">
        {categories.map((cat, index) => (
          <li key={index} className="dropdown-item">
            <span className="icon">{cat.icon}</span>
            <span className="name">{cat.name}</span>
            {cat.isNew && <span className="badge">NEW</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;