// src/pages/CartPage.jsx
import React from 'react';

export default function CartPage({ cart, setCart }) {
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} style={{ width: 100 }} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.price} Dt</p>
              <button onClick={() => handleRemove(item._id)}>Supprimer</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
