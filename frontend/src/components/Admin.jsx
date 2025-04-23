import React, { useState } from 'react';
import "../styles/Admin.css";

function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setAuthenticated(true);
    } else {
      alert('Identifiants incorrects');
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <h2>Connexion Administrateur</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2>Tableau de bord Administrateur</h2>
      <section>
        <h3>Produits</h3>
        {/* Gestion des produits, afficher une liste ou un formulaire pour ajouter/éditer des produits */}
        <button>Ajouter un nouveau produit</button>
      </section>
      <section>
        <h3>Commandes</h3>
        {/* Affichage des commandes en attente */}
        <button>Voir les commandes</button>
      </section>
    </div>
  );
}

export default Admin;
