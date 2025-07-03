import React from "react";
import { Routes, Route } from "react-router-dom"; // Assure-toi d'importer Routes et Route
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage"; // et non Cart
import ProductsPage from "./pages/ProductsPage";
import ClientAuth from "./pages/ClientAuth";

import 'font-awesome/css/font-awesome.min.css';


function App() {
  return (
    <>
      <Navbar />
      <Routes> {/* Utilisation de Routes ici */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ClientAuth/>} />
        <Route path="/panier" element={<CartPage />} />
       <Route path="/products" element={<ProductsPage />} />

      </Routes>
    </>
  );
}

export default App;
