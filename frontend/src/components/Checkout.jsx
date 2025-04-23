import React, { useState } from 'react';
import "../styles/Checkout.css";


function Checkout() {
  const [form, setForm] = useState({ name: '', address: '' });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Commande envoyée par ${form.name} !`);
    localStorage.removeItem('cart');
  };

  return (
    <form className="checkout" onSubmit={handleSubmit}>
      <h2>Valider la commande</h2>
      <input name="name" placeholder="Nom" onChange={handleChange} required />
      <input name="address" placeholder="Adresse" onChange={handleChange} required />
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default Checkout;
