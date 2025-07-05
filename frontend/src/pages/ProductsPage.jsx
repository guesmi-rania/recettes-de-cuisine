// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductFiltersSidebar from "../components/ProductFiltersSidebar";
import QuickFilters from "../components/QuickFilters";
import "../styles/Shop.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductsPage({ onAddToCart, onAddToWishlist }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        alert("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleFilter = (category) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  const handleSort = (order) => {
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  return (
    <div className="products-page">
      {/* 🔸 Titre et description */}
      <div className="products-header">
        <h1>Nos Pâtisseries</h1>
        <p className="products-description">
          Découvrez nos délicieuses créations artisanales, pour tous les goûts et toutes les occasions.
        </p>
      </div>

      <div className="products-content">
        {/* 🧰 Sidebar */}
        <ProductFiltersSidebar onFilter={handleFilter} />

        <div className="products-main">
          {/* 🔍 Filtres rapides */}
          <QuickFilters onSort={handleSort} />

          {loading ? (
            <p>Chargement des produits...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
