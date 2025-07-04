import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductDetail() {
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "300px" }} />
      <p>{product.description}</p>
      <p><strong>Prix :</strong> {product.price} Dt</p>
    </div>
  );
}
