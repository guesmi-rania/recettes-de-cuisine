// src/pages/Home.jsx
// ⚠️ SEUL CHANGEMENT : le slider est maintenant dans un hero-layout avec Categories à gauche
// Tout le reste du code est identique

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import RecipeShowcase from "../components/RecipeShowcase";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import CategoryExplore from "../components/CategoryExplore";
import PopularProducts from "../components/PopularProducts";
import Features from "../components/Features";
import Categories from "../components/Categories";   // ← ajout
import Slider from "../components/Slider";           // ← ajout

import "../styles/Home.css";
import "../styles/Slider.css";                        // ← s'assurer que Slider.css est importé ici

export default function Home({ onAddToCart, wishlist, compareList, onToggleWishlist, onAddToCompare }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/products`);
        const productsWithPrice = res.data.map(p => ({
          ...p,
          price: p.price || Math.floor(Math.random() * 50) + 10
        }));
        setProducts(productsWithPrice);
      } catch (err) {
        console.error("Erreur récupération produits :", err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <Helmet>
        <title>Douceurs du Chef | Pâtisseries et Délices à Domicile</title>
        <meta
          name="description"
          content="Découvrez Douceurs du Chef : pâtisseries artisanales, délices sucrés et salés, livraison rapide et paiement sécurisé."
        />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>

      <Features />
      <hr className="section-separator" />

      {/* ===== HERO LAYOUT : sidebar catégories gauche + slider droite ===== */}
      <div className="hero-layout">
        {/* Colonne gauche — catégories */}
        <div className="hero-categories">
          <Categories />
        </div>

        {/* Colonne droite — slider */}
        <div className="hero-slider">
          <Slider />
        </div>
      </div>
      {/* ===== FIN HERO LAYOUT ===== */}

      <hr className="section-separator" />

      <CategoryExplore />

      <hr className="section-separator" />

      {loading && <p>Chargement des produits...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <PopularProducts
          products={products}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          compareList={compareList}
          onToggleWishlist={onToggleWishlist}
          onAddToCompare={onAddToCompare}
        />
      )}

      <hr className="section-separator" />

      <RecipeShowcase />
      <hr className="section-separator" />
      <AboutUs />
      <hr className="section-separator" />

      <Footer />
    </div>
  );
}