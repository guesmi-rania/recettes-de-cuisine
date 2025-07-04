// src/pages/WishlistPage.jsx
import React from 'react';

export default function WishlistPage({ wishlist, setWishlist }) {
  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
  };

  return (
    <div className="wishlist-page">
      <h2>Ma Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Votre wishlist est vide.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} className="wishlist-item">
            <img src={item.imageUrl} alt={item.name} style={{ width: 100 }} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.price} Dt</p>
              <button onClick={() => handleRemove(item._id)}>Supprimer</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
