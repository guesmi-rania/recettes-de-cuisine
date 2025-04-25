import React from "react";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Tableau de bord Administrateur</h2>
      <section>
        <h3>Produits</h3>
        <button>Ajouter un produit</button>
      </section>
      <section>
        <h3>Commandes</h3>
        <button>Voir les commandes</button>
      </section>
    </div>
  );
}

export default AdminDashboard;
