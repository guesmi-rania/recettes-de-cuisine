import React from "react";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-price">{product.price} €</p>
      <p className="product-category">{product.category}</p>
      <button className="add-to-cart-btn">Ajouter au panier</button>
    </div>
  );
}
