import React from "react";
import { Routes, Route } from "react-router-dom"; // Assure-toi d'importer Routes et Route
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage"; // et non Cart
import ProductsPage from "./pages/ProductsPage";
import AdminLogin from "./pages/AdminLogin";
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes> {/* Utilisation de Routes ici */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/panier" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
