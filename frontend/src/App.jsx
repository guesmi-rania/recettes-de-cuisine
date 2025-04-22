import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";
import ProductList from "./ProductList";
import Checkout from "./Checkout"; // Assurez-vous que le composant Checkout est bien créé

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('/api/recipes');
      if (Array.isArray(response.data)) {
        setRecipes(response.data);
      } else {
        throw new Error('Les données reçues ne sont pas sous forme de tableau');
      }
    } catch (error) {
      setError('Erreur lors de la récupération des recettes');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecipe = { title, ingredients, instructions };
      const response = await axios.post('/api/recipes', newRecipe);
      setRecipes([...recipes, response.data]);
      setTitle('');
      setIngredients('');
      setInstructions('');
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la recette :', err);
      setError('Erreur lors de l\'ajout de la recette');
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleClearCart = () => {
    setCart([]);
    setIsCheckout(false);
  };

  if (loading) return <div className="loading">Chargement des recettes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>🍽️ Recettes de Cuisine</h1>

      <form onSubmit={handleSubmit} className="recipe-form">
        <h2>Ajouter une recette</h2>
        <label>Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Ex: Tarte aux pommes"
        />

        <label>Ingrédients</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          placeholder="Ex: Pommes, sucre, pâte brisée..."
        />

        <label>Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          placeholder="Ex: Préchauffez le four à 180°C..."
        />

        <button type="submit">➕ Ajouter la recette</button>
      </form>

      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p><strong>📝 Ingrédients :</strong> {recipe.ingredients}</p>
              <p><strong>👨‍🍳 Instructions :</strong> {recipe.instructions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-recipes">Aucune recette disponible</p>
      )}

      {/* Affichage des produits */}
      <ProductList onAddToCart={handleAddToCart} />

      {/* Affichage du panier */}
      {cart.length > 0 && !isCheckout && (
        <div className="cart">
          <h2>Panier</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price} €
              </li>
            ))}
          </ul>
          <p>Total : {getTotal()} €</p>
          <button onClick={() => setIsCheckout(true)}>Passer à la commande</button>
        </div>
      )}

      {/* Page de checkout */}
      {isCheckout && (
        <Checkout cart={cart} total={getTotal()} onClearCart={handleClearCart} />
      )}
    </div>
  );
};

export default App;
