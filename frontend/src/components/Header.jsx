import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Douceurs du Chef</Link>
      </div>
      <nav>
        <Link to="/produits">Nos Produits</Link>
        <Link to="/categories">Catégories</Link>
        <Link to="/recettes">Recettes</Link>
        <Link to="/degustation">Dégustation</Link>
        <Link to="/about-us">Qui sommes-nous ?</Link>
        <Link to="/panier">Panier</Link>
      </nav>
    </header>
  );
}

export default Header;
