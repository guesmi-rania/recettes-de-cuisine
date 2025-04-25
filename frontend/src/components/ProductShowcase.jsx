// ProductShowcase.jsx
import React from 'react';
import './ProductShowcase.css';

function ProductShowcase() {
  return (
    <div className="product-showcase">
      <h2>Nos Produits Populaires</h2>
      <div className="products">
        {/* Remplir avec des images de produits */}
        <div className="product-item">
          <img src="/images/product1.jpg" alt="Product 1" />
          <h3>Produit 1</h3>
        </div>
        <div className="product-item">
          <img src="/images/product2.jpg" alt="Product 2" />
          <h3>Produit 2</h3>
        </div>
        <div className="product-item">
          <img src="/images/product3.jpg" alt="Product 3" />
          <h3>Produit 3</h3>
        </div>
      </div>
    </div>
  );
}

export default ProductShowcase;
