import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/OrderForm.css";  // Import du fichier CSS

const BASE_URL = import.meta.env.VITE_API_URL;

export default function OrderForm() {
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products`).then(res => setProducts(res.data));
  }, []);

  const addProductToOrder = product => {
    const exists = orderProducts.find(p => p.product._id === product._id);
    if (exists) {
      setOrderProducts(orderProducts.map(p => p.product._id === product._id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setOrderProducts([...orderProducts, { product, quantity: 1 }]);
    }
  };

  const removeProductFromOrder = productId => {
    setOrderProducts(orderProducts.filter(p => p.product._id !== productId));
  };

  const changeQuantity = (productId, qty) => {
    if (qty < 1) return;
    setOrderProducts(orderProducts.map(p => p.product._id === productId ? { ...p, quantity: qty } : p));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!clientName || !clientEmail || !address || orderProducts.length === 0) {
      alert("Merci de remplir tous les champs et ajouter au moins un produit.");
      return;
    }

    setLoading(true);
    try {
      const totalPrice = orderProducts.reduce((sum, p) => sum + p.product.price * p.quantity, 0);
      const orderData = {
        products: orderProducts.map(p => ({ product: p.product._id, quantity: p.quantity })),
        clientName,
        clientEmail,
        address,
        totalPrice,
      };
      await axios.post(`${BASE_URL}/api/orders`, orderData);
      alert("Commande enregistrée !");
      setOrderProducts([]);
      setClientName("");
      setClientEmail("");
      setAddress("");
    } catch (error) {
      alert("Erreur lors de l'enregistrement de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-container">
      <h2>Passer une commande</h2>

      <div>
        <h3>Produits disponibles</h3>
        <ul className="product-list">
          {products.map(p => (
            <li key={p._id}>
              <strong>{p.name}</strong> - {p.price} €
              <button onClick={() => addProductToOrder(p)}>Ajouter</button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Votre panier</h3>
        {orderProducts.length === 0 && <p>Pas de produit ajouté.</p>}
        {orderProducts.map(p => (
          <div key={p.product._id} className="cart-item">
            <strong>{p.product.name}</strong> - {p.product.price} € x
            <input
              type="number"
              min="1"
              value={p.quantity}
              onChange={e => changeQuantity(p.product._id, Number(e.target.value))}
            />
            <button type="button" onClick={() => removeProductFromOrder(p.product._id)}>Supprimer</button>
          </div>
        ))}

        <label>Nom complet</label>
        <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} required />

        <label>Adresse de livraison</label>
        <textarea value={address} onChange={e => setAddress(e.target.value)} required />

        <button type="submit" disabled={loading}>{loading ? "Envoi..." : "Commander"}</button>
      </form>
    </div>
  );
}
