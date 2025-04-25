import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return (
    <div className="product-list">
      <h2>Nos Produits</h2>
      <div className="products">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <strong>{product.price} €</strong>
            <div className="buttons">
              <Link to={`/produits/${product._id}`}>Détails</Link>
              <button onClick={() => addToCart(product)}>Ajouter au panier</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
