import React from "react";

const Checkout = ({ cart, total, onClearCart }) => {
  return (
    <div className="checkout">
      <h2>Confirmation de la commande</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price} €
          </li>
        ))}
      </ul>
      <p><strong>Total : {total} €</strong></p>
      <button onClick={onClearCart}>Annuler la commande</button>
      <button>Valider la commande</button>
    </div>
  );
};

export default Checkout;
