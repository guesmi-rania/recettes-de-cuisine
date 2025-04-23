import React from 'react';
import "../styles/ProductImages.css";

function ProductImages() {
  const products = [
    { name: 'Gâteau au Chocolat', image: '/images/product1.jpg' },
    { name: 'Tarte aux Fruits', image: '/images/product2.jpg' },
    { name: 'Biscuit de Noël', image: '/images/product3.jpg' }
  ];

  return (
    <section className="product-images">
      <h2>Nos Produits</h2>
      <div className="product-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductImages;
