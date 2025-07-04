import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import ClientAuth from "./pages/ClientAuth";
import WishlistPage from "./pages/WishlistPage";
import ProductDetail from "./pages/ProductDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Notifications toast
  const notifyAddCart = (name) => toast.success(`✅ ${name} ajouté au panier !`);
  const notifyAddWishlist = (name) => toast.info(`❤️ ${name} ajouté à la wishlist !`);
  const notifyAlreadyWishlist = (name) => toast.warning(`⚠️ ${name} est déjà dans la wishlist !`);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    notifyAddCart(product.name);
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist((prev) => [...prev, product]);
      notifyAddWishlist(product.name);
    } else {
      notifyAlreadyWishlist(product.name);
    }
  };

  return (
    <>
      <Navbar cart={cart} wishlist={wishlist} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/produits"
          element={
            <ProductsPage
              cart={cart}
              wishlist={wishlist}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          }
        />
        <Route
          path="/produits/:id"
          element={
            <ProductDetail
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlist={wishlist}
            />
          }
        />
        <Route path="/panier" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/commandes" element={<OrdersPage />} />
        <Route path="/login" element={<ClientAuth />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2500} />
    </>
  );
}

export default App;
