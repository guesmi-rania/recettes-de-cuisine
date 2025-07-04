import React from "react";
import { Routes, Route } from "react-router-dom"; // Assure-toi d'importer Routes et Route
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage"; // et non Cart
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import ClientAuth from "./pages/ClientAuth";

import 'font-awesome/css/font-awesome.min.css';


function App() {
  return (
    <>
      <Navbar />
      <Routes> {/* Utilisation de Routes ici */}
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<ProductsPage />} />
        <Route path="/panier" element={<OrdersPage />} />
        <Route path="/login" element={<ClientAuth/>} />
        <Route path="/panier" element={<CartPage />} />

      </Routes>
    </>
  );
}

export default App;
