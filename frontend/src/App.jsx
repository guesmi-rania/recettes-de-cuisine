import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import TastingList from './components/TastingList';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<ProductList />} />
        <Route path="/produits/:id" element={<ProductDetail />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/degustation" element={<TastingList />} />
      </Routes>
    </Router>
  );
}

export default App;
