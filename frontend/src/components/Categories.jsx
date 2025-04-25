import React from "react";
import "../styles/Categories.css";

function Categories() {
  const categories = ["Gâteaux", "Salés", "Viennoiseries", "Biscuits", "Tartes"];

  return (
    <div className="categories-list">
      <h3>Catégories</h3>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
