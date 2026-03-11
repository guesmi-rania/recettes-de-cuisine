import React, { useState } from "react";
import axios from "axios";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL =
    import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/login`, {
        username,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      onLogin();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = async () => {
    const demoUsername = "admin";
    const demoPassword = "Rania@123";
    setUsername(demoUsername);
    setPassword(demoPassword);
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/login`, {
        username: demoUsername,
        password: demoPassword,
      });
      localStorage.setItem("adminToken", res.data.token);
      onLogin();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Connexion Admin</h2>

        {/* ✅ Encart démo */}
        <div className="demo-banner">
          <div className="demo-info">
            <span className="demo-icon">🧪</span>
            <div>
              <strong>Compte de démonstration</strong>
              <p>
                Utilisateur : <code>admin</code>
              </p>
              <p>
                Mot de passe : <code>Admin123!</code>
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn-demo"
            onClick={loginAsDemo}
            disabled={loading}
          >
            {loading ? "Connexion..." : "Tester la démo →"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-row">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
    </div>
  );
}