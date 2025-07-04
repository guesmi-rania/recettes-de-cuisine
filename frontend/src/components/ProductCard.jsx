import React from "react";
import "../styles/ProductCard.css";

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const handleShare = () => {
    const shareUrl = window.location.origin + `/produits/${product._id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Lien du produit copié !");
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-price">{product.price} Dt</p>
      <div className="product-actions">
        <button onClick={() => onAddToCart(product)} title="Ajouter au panier">🛒</button>
        <button onClick={() => onAddToWishlist(product)} title="Ajouter à la wishlist">❤️</button>
        <button onClick={handleShare} title="Partager">🔗</button>
      </div>
    </div>
  );
}
