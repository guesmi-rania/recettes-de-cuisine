import React from "react";
import ProductList from "../components/ProductList"; // Assurez-vous que le chemin est correct
import ProductDetails from "../components/ProductDetails"; // Si vous avez aussi besoin de l'afficher

function ProductsPage() {
  return (
    <div>
      <h2>Nos Produits</h2>
      
      <ProductList />
      
    </div>
  );
}

export default ProductsPage;
