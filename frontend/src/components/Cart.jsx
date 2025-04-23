import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Cart.css";


function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  const updateQuantity = (index, amount) => {
    const updated = [...cart];
    updated[index].quantity += amount;
    if (updated[index].quantity < 1) updated[index].quantity = 1;
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Panier</h2>
      {cart.map((item, i) => (
        <div key={i} className="cart-item">
          <p>{item.name} - {item.price}€ x {item.quantity}</p>
          <button onClick={() => updateQuantity(i, -1)}>-</button>
          <button onClick={() => updateQuantity(i, 1)}>+</button>
        </div>
      ))}
      <h3>Total : {total}€</h3>
      <Link to="/checkout">Commander</Link>
    </div>
  );
}

export default Cart;
