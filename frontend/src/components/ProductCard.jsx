// src/components/ProductCard.jsx
import React from "react";
import "../styles/ProductCard.css";
import { FaShoppingCart, FaHeart, FaShareAlt } from "react-icons/fa";

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert("Lien du produit copié !");
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-price">{product.price} Dt</p>

      <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
        <FaShoppingCart /> Ajouter au panier
      </button>

      <div className="product-actions">
        <button onClick={() => onAddToWishlist(product)}>
          <FaHeart style={{ color: "red" }} />
        </button>
        <button onClick={handleShare}>
          <FaShareAlt style={{ color: "#FE7A36" }} />
        </button>
      </div>
    </div>
  );
}
