import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ajoute useNavigate si tu veux naviguer
import { MdOutlineSoupKitchen, MdOutlineDinnerDining } from "react-icons/md";
import { LuDonut } from "react-icons/lu";
import { TbRectangle } from "react-icons/tb";
import { RiCake3Line } from "react-icons/ri";
import { BsCake } from "react-icons/bs";
import { PiCloudFill } from "react-icons/pi";
import { LiaBreadSliceSolid } from "react-icons/lia";
import { BiCheese } from "react-icons/bi";

import "../styles/Categories.css";

function Categories({ onClickCategory }) {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { name: "Gâteaux Signature", icon: <MdOutlineSoupKitchen /> },
    { name: "Mousses & Entremets", icon: <RiCake3Line />, isNew: true },
    { name: "Gâteaux Événementiels", icon: <BsCake /> },
    { name: "Viennoiseries", icon: <LiaBreadSliceSolid /> },
    { name: "Millefeuilles", icon: <TbRectangle />, isNew: true },
    { name: "Feuilletés Salés", icon: <MdOutlineDinnerDining /> },
    { name: "Choux & Crèmes", icon: <PiCloudFill /> },
    { name: "Cheesecakes", icon: <BiCheese /> },
    { name: "Donuts", icon: <LuDonut /> },
  ];

  const newItems = [
    { name: "Tartelette Fruits Rouges" },
    { name: "Éclair Chocolat Blanc" },
    { name: "Brownie Noisette" },
  ];

  const handleClick = (catName) => {
    setSelected(catName);
    if (onClickCategory) onClickCategory(catName);
    // Naviguer vers la page ProductsByCategory
    navigate(`/produits/${encodeURIComponent(catName)}`);
  };

  return (
    <ul className="categories-list" role="menu">
      {categories.map((cat, index) => (
        <li key={index} className="dropdown-item" role="none">
          <button
            className={`category-link ${selected === cat.name ? "selected" : ""}`}
            onClick={() => handleClick(cat.name)}
            role="menuitem"
          >
            <span className="icon">{cat.icon}</span>
            <span className="name">{cat.name}</span>
          </button>
        </li>
      ))}

      {/* Section Nouveautés */}
      <li className="dropdown-item nouveautes-title">Nouveautés</li>
      {newItems.map((item, index) => (
        <li key={index} className="dropdown-item" role="none">
          <button
            className="category-link nouveaute-link"
            onClick={() => navigate(`/produit/${encodeURIComponent(item.name)}`)}
          >
            <span className="name">{item.name}</span>
            <span className="badge-new">NEW</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
