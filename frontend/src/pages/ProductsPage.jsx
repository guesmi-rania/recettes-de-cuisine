import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductFiltersSidebar from "../components/ProductFiltersSidebar";
import QuickFilters from "../components/QuickFilters";
import "../styles/Shop.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      alert("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="shop-container">
      <ProductFiltersSidebar onFilter={handleFilter} />

      <div className="shop-content">
        <QuickFilters onSort={handleSort} />

        {loading ? (
          <p>Chargement des produits...</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}