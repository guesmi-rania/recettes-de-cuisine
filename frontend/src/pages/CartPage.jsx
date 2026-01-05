import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/Cart.css";
import Footer from "../components/Footer";
import { calculateTotals } from "../utils/calculateTotals";

export default function CartPage({ cart, setCart }) {
  const navigate = useNavigate();
  const [totals, setTotals] = useState({ subTotal: 0, taxes: 0, shipping: 0, total: 0 });

  useEffect(() => {
    const result = calculateTotals(cart, { type: "cart" });
    setTotals(result);
  }, [cart]);

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleQuantityChange = (id, delta) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <Helmet>
          <title>Mon Panier | Douceurs du Chef</title>
          <meta
            name="description"
            content="Consultez les articles de votre panier sur Douceurs du Chef."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <h2>🛒 Mon Panier</h2>

        {cart.length === 0 ? (
          <p className="empty">Votre panier est vide.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td className="product-info">
                      <img src={item.imageUrl} alt={item.name} />
                      <span>{item.name}</span>
                    </td>
                    <td>{item.price.toFixed(2)} DT</td>
                    <td>
                      <div className="qty-control">
                        <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                      </div>
                    </td>
                    <td>{(item.price * item.quantity).toFixed(2)} DT</td>
                    <td>
                      <button className="remove-btn" onClick={() => handleRemove(item._id)}>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <h3>Résumé de la commande</h3>
              <p>Sous-total : {totals.subTotal.toFixed(2)} DT</p>
              <p>Livraison : {totals.shipping.toFixed(2)} DT</p>
              <p>Taxes (5%) : {totals.taxes.toFixed(2)} DT</p>
              <h3>Total : {totals.total.toFixed(2)} DT</h3>

              <button className="checkout-btn" onClick={handleCheckout}>
                Passer la commande
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
