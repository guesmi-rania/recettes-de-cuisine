import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les commandes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.put(`${BASE_URL}/api/admin/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendEmail = async (email) => {
    const subject = prompt("Sujet de l'email:");
    const msg = prompt("Message à envoyer:");
    if (!subject || !msg) return;
    try {
      await axios.post(`${BASE_URL}/api/admin/send-email`, { email, subject, message: msg }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✓ Email envoyé avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      Chargement des commandes...
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <h2>Commandes</h2>
        <p>{orders.length} commande{orders.length !== 1 ? "s" : ""} au total</p>
      </div>

      {message && <div className="alert-success">{message}</div>}
      {error && <div className="alert-error">{error}</div>}

      {orders.length === 0 ? (
        <div className="table-wrapper">
          <div className="empty-state"><p>Aucune commande trouvée.</p></div>
        </div>
      ) : (
        <div className="table-wrapper">
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Commande</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>
                      <div style={{ fontWeight: 500, color: "var(--text-primary)" }}>
                        {order.clientInfo.name}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 3 }}>
                        {order.clientInfo.email}
                      </div>
                    </td>
                    <td>
                      {order.cart.map(item => (
                        <div key={item.name} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                          {item.name} ×{item.quantity} — {item.price} TND
                        </div>
                      ))}
                    </td>
                    <td style={{ color: "var(--accent)", fontWeight: 600 }}>
                      {order.totalPrice} TND
                    </td>
                    <td>
                      <span className={`status ${order.status?.toLowerCase().replace(" ", "-") || "en-attente"}`}>
                        {order.status || "En attente"}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {new Date(order.createdAt).toLocaleString("fr-FR")}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button onClick={() => handleUpdateStatus(order._id, "Validée")}>
                          ✓ Valider
                        </button>
                        <button className="cancel-btn" onClick={() => handleUpdateStatus(order._id, "Annulée")}>
                          ✕ Annuler
                        </button>
                        <button className="email-btn" onClick={() => handleSendEmail(order.clientInfo.email)}>
                          ✉ Email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}