import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";
import Footer from "../components/Footer";

const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Totaux globaux
  const [subTotal, setSubTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Récupérer les commandes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orders`);
        setOrders(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des commandes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Calculer les totaux globaux
  useEffect(() => {
    if (orders.length > 0) {
      // Sous-total : somme de totalPrice de chaque commande
      const sub = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

      // Taxes : 5% du sous-total
      const tax = sub * 0.05;

      // Livraison : 7 DT par commande
      const ship = orders.length * 7;

      // Total général
      const total = sub + tax + ship;

      setSubTotal(sub);
      setTaxes(tax);
      setShipping(ship);
      setGrandTotal(total);
    } else {
      setSubTotal(0);
      setTaxes(0);
      setShipping(0);
      setGrandTotal(0);
    }
  }, [orders]);

  // Calculer le total de chaque commande individuellement
  const calculateOrderTotal = (order) => {
    const orderSubTotal = order.cart?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
    const orderTax = orderSubTotal * 0.05;
    const orderShipping = order.cart?.length > 0 ? 7 : 0;
    return orderSubTotal + orderTax + orderShipping;
  };

  return (
    <div className="orders-page">
      <h2 className="orders-title">Mes commandes</h2>

      {loading ? (
        <p className="loading">Chargement des commandes...</p>
      ) : orders.length === 0 ? (
        <p className="empty">Vous n’avez pas encore passé de commande.</p>
      ) : (
        <>
          {/* ===== Résumé global ===== */}
          <div className="orders-summary">
            <h3>Résumé global des commandes</h3>
            <p>Sous-total : {subTotal.toFixed(2)} DT</p>
            <p>Taxes (5%) : {taxes.toFixed(2)} DT</p>
            <p>Livraison : {shipping.toFixed(2)} DT</p>
            <h3>Total général : {grandTotal.toFixed(2)} DT</h3>
          </div>

          {/* ===== Liste des commandes ===== */}
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-info">
                <p><strong>Client :</strong> {order.clientInfo?.name}</p>
                <p><strong>Email :</strong> {order.clientInfo?.email}</p>
                <p><strong>Adresse :</strong> {order.clientInfo?.address}</p>
                <p><strong>Total commande :</strong> {calculateOrderTotal(order).toFixed(2)} DT</p>
                <p>
                  <strong>Statut :</strong>{" "}
                  <span className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                    {order.status}
                  </span>
                </p>
              </div>
              <div className="order-products">
                <strong>Produits :</strong>
                <ul>
                  {order.cart?.length > 0 ? (
                    order.cart.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} = {(item.price * item.quantity).toFixed(2)} DT
                      </li>
                    ))
                  ) : (
                    <li>Aucun produit</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </>
      )}

      <Footer />
    </div>
  );
}
