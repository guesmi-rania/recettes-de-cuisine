import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome({ setUser }) {
  const navigate = useNavigate();

  const startShopping = () => {
    setUser(prev => ({ ...prev, isNew: false }));
    navigate("/shop");
  };

  return (
    <div>
      <h2>Bienvenue !</h2>
      <p>Merci pour votre inscription. Vous pouvez commencer à commander.</p>
      <button onClick={startShopping}>Commencer à commander</button>
    </div>
  );
}
