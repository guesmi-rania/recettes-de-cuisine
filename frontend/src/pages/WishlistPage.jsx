import React from "react";

export default function WishlistPage({ wishlist, setWishlist }) {
  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="wishlist-page" style={{ padding: "20px" }}>
      <h2>Ma Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Votre wishlist est vide.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} className="wishlist-item" style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: 100, marginRight: "15px" }} />
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
