// ===== AdminCategories.jsx =====
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les catégories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [token]);

  if (loading) return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      Chargement des catégories...
    </div>
  );
  if (error) return <div className="alert-error">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Catégories</h2>
        <p>{categories.length} catégorie{categories.length !== 1 ? "s" : ""}</p>
      </div>

      {categories.length === 0 ? (
        <div className="table-wrapper">
          <div className="empty-state"><p>Aucune catégorie trouvée.</p></div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Créée le</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, idx) => (
                <tr key={c._id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{c.name}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {new Date(c.createdAt).toLocaleDateString("fr-FR")}
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