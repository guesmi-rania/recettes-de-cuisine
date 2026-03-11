import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  const BASE_URL = import.meta.env.VITE_API_URL;
  const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL;

  const fetchData = async () => {
    try {
      const [ordersRes, productsRes, clientsRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/orders`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${PRODUCTS_URL}`),
        axios.get(`${BASE_URL}/clients`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      setClients(Array.isArray(clientsRes.data) ? clientsRes.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
    else setLoading(false);
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const generatePDF = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Devis / Commande", 20, 20);
    doc.setFontSize(12);
    doc.text(`Client : ${order.clientInfo?.name}`, 20, 35);
    doc.text(`Email : ${order.clientInfo?.email}`, 20, 45);
    doc.text(`Adresse : ${order.clientInfo?.address}`, 20, 55);
    doc.text(`Date : ${new Date(order.createdAt).toLocaleString()}`, 20, 65);
    doc.text("Produits :", 20, 75);
    let y = 85;
    order.cart.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.name} × ${item.quantity} - ${item.price} DT`, 25, y);
      y += 10;
    });
    doc.text(`Total : ${order.totalPrice} DT`, 20, y + 5);
    doc.save(`commande_${order._id}.pdf`);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const pendingOrders = orders.filter(o => o.status === "En attente" || !o.status).length;

  if (loading) return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      Chargement du tableau de bord...
    </div>
  );

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h2>Tableau de bord</h2>
        <p>Bienvenue ! Voici un aperçu de votre activité.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon orange">📦</div>
          <h4>Commandes</h4>
          <p>{orders.length}</p>
          <div className="stat-card-trend">↑ {pendingOrders} en attente</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon green">💰</div>
          <h4>Chiffre d'affaires</h4>
          <p>{totalRevenue.toFixed(0)} <span style={{ fontSize: "1rem", fontWeight: 400, color: "var(--text-muted)" }}>DT</span></p>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon blue">🛍️</div>
          <h4>Produits</h4>
          <p>{products.length}</p>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon yellow">👥</div>
          <h4>Clients</h4>
          <p>{clients.length}</p>
        </div>
      </div>

      {/* Commandes récentes */}
      <h3 className="section-title">Commandes récentes</h3>

      {orders.length === 0 ? (
        <div className="table-wrapper">
          <div className="empty-state"><p>Aucune commande pour le moment.</p></div>
        </div>
      ) : (
        <div className="table-wrapper">
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Produits</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                      {order.clientInfo?.name}
                    </td>
                    <td>{order.clientInfo?.email}</td>
                    <td>
                      {order.cart?.map((item, idx) => (
                        <div key={idx} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td style={{ color: "var(--accent)", fontWeight: 600 }}>
                      {order.totalPrice.toFixed(2)} DT
                    </td>
                    <td>
                      <span className={`status ${order.status?.toLowerCase().replace(" ", "-") || "en-attente"}`}>
                        {order.status || "En attente"}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button onClick={() => handleStatusChange(order._id, "Validée")}>
                          ✓ Valider
                        </button>
                        <button className="cancel-btn" onClick={() => handleStatusChange(order._id, "Annulée")}>
                          ✕ Annuler
                        </button>
                        <button className="pdf-btn" onClick={() => generatePDF(order)}>
                          ↓ PDF
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