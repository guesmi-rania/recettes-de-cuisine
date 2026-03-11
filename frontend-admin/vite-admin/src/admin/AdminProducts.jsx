// ===== AdminProducts.jsx =====
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  if (loading) return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      Chargement des produits...
    </div>
  );
  if (error) return <div className="alert-error">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Produits</h2>
        <p>{products.length} produit{products.length !== 1 ? "s" : ""} disponible{products.length !== 1 ? "s" : ""}</p>
      </div>

      {products.length === 0 ? (
        <div className="table-wrapper">
          <div className="empty-state"><p>Aucun produit trouvé.</p></div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Catégorie</th>
                <th>Créé le</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{p.name}</td>
                  <td style={{ color: "var(--accent)", fontWeight: 600 }}>{p.price} DT</td>
                  <td>
                    <span style={{
                      background: "var(--blue-soft)",
                      color: "var(--blue)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "100px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      {p.category}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {new Date(p.createdAt).toLocaleDateString("fr-FR")}
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