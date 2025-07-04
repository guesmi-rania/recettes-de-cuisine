import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductFiltersSidebar from "../components/ProductFiltersSidebar";
import QuickFilters from "../components/QuickFilters";
import "../styles/Shop.css";
import "../styles/ProductFiltersSidebar.css";
import "../styles/ProductCard.css";
import "../styles/QuickFilters.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setCart(storedCart);
    setWishlist(storedWishlist);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  setCart(storedCart);
  setWishlist(storedWishlist);
}, []);

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

useEffect(() => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}, [wishlist]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      console.log("Produits récupérés :", res.data);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Erreur axios :", error);
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

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} ajouté au panier !`);
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist([...wishlist, product]);
      alert(`${product.name} ajouté à la wishlist !`);
    } else {
      alert(`${product.name} est déjà dans la wishlist !`);
    }
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
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
