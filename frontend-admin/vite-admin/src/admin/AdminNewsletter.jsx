// ===== AdminNewsletter.jsx =====
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/newsletter`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubscribers(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les abonnés.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, [token]);

  if (loading) return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      Chargement des abonnés...
    </div>
  );
  if (error) return <div className="alert-error">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Newsletter</h2>
        <p>{subscribers.length} abonné{subscribers.length !== 1 ? "s" : ""}</p>
      </div>

      {subscribers.length === 0 ? (
        <div className="table-wrapper">
          <div className="empty-state"><p>Aucun abonné pour le moment.</p></div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, idx) => (
                <tr key={sub._id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                    {sub.email}
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {new Date(sub.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}