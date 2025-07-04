import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductDetail({ onAddToCart, onAddToWishlist, wishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Produit non trouvé"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement du produit...</p>;
  if (!product) return <p>Produit introuvable.</p>;

  const isInWishlist = wishlist.find((item) => item._id === product._id);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "300px" }} />
      <p>{product.description}</p>
      <p><strong>Prix :</strong> {product.price} Dt</p>
      <button onClick={() => onAddToCart(product)}>Ajouter au panier</button>
      <button
        onClick={() => onAddToWishlist(product)}
        disabled={isInWishlist}
        style={{ marginLeft: "10px" }}
      >
        {isInWishlist ? "Déjà en wishlist" : "Ajouter à la wishlist"}
      </button>
    </div>
  );
}
