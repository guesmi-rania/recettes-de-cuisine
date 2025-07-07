import React, { useState } from "react";
import "../styles/ClientAuth.css";

function ClientAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isLogin) {
      // Inscription
      if (formData.password !== formData.confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }
      try {
        const res = await fetch("https://ton-backend/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Inscription réussie, connectez-vous !");
          setIsLogin(true);
        } else {
          alert(data.message || "Erreur inscription");
        }
      } catch (error) {
        alert("Erreur serveur, réessayez plus tard");
      }
    } else {
      // Connexion
      try {
        const res = await fetch("https://ton-backend/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          // Stocker le token et/ou infos utilisateur
          localStorage.setItem("token", data.token);
          localStorage.setItem("client", JSON.stringify(data.user));
  
          alert("Connexion réussie !");
          // Redirection selon ta logique, ex. page shop ou dashboard
          window.location.href = data.user.isNew ? "/produits" : "/commandes";
        } else {
          alert(data.message || "Erreur connexion");
        }
      } catch (error) {
        alert("Erreur serveur, réessayez plus tard");
      }
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Connexion
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleShowPassword}
              aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {!isLogin && (
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <div className="auth-switch-text">
          {isLogin ? (
            <>
              Pas de compte ?{" "}
              <span className="link" onClick={toggleMode}>
                Inscrivez-vous
              </span>
            </>
          ) : (
            <>
              Déjà un compte ?{" "}
              <span className="link" onClick={toggleMode}>
                Connectez-vous
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientAuth;
