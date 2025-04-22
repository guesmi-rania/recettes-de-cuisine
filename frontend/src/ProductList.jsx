import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // Vous pouvez ajouter un fichier CSS pour styliser les produits

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erreur de chargement des produits :", err));
  }, []);

  return (
    <div className="product-list">
      <h2>🧁 Nos Produits</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <strong>{product.price} €</strong>
            <button onClick={() => onAddToCart(product)}>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
