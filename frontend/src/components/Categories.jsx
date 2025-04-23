import React from 'react';
import "../styles/Categories.css";

function Categories() {
  const categories = ['Gâteaux', 'Tartes', 'Biscuits', 'Pâtisseries Salées'];

  return (
    <section className="categories">
      <h2>Nos Catégories</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <h3>{category}</h3>
            <p>Découvrez nos produits dans cette catégorie.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
