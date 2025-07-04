import React from "react";
import "../styles/ProductCard.css";

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert('Lien du produit copié !');
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-price">{product.price} Dt</p>

      <div className="product-actions">
        <button onClick={() => onAddToCart(product)}>🛒</button>
        <button onClick={() => onAddToWishlist(product)}>❤️</button>
        <button onClick={handleShare}>🔗</button>
      </div>
    </div>
  );
}
