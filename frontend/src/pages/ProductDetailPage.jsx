import React from 'react';
import "../styles/ProductDetailPage.css";  // Assurez-vous que le chemin est correct

function ProductDetailPage() {
  const product = {
    title: "Gâteau au Chocolat",
    description: "Un délicieux gâteau au chocolat fait maison avec des ingrédients de qualité.",
    image: "/images/gateau-chocolat.jpg",
    price: "20.00€",
    features: [
      "Fait maison",
      "Utilisation de chocolat de qualité",
      "Disponible en plusieurs tailles"
    ]
  };

  return (
    <div className="product-details-page">
      <div className="product-header">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
      </div>
      
      <div className="product-info">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-description">
          <h3>Caractéristiques :</h3>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="product-footer">
        <div className="product-price">{product.price}</div>
        <button className="add-to-cart-btn">Ajouter au panier</button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
