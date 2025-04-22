import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [recipe, setRecipe] = useState(null);
  
  // Fonction pour récupérer une recette par ID
  const fetchRecipe = async (id) => {
    try {
      const response = await axios.get(`/api/recipes/${id}`); // Appel à l'API pour récupérer la recette avec l'ID
      setRecipe(response.data); // Stocke la recette récupérée dans le state
    } catch (error) {
      console.error('Erreur lors de la récupération de la recette', error); // En cas d'erreur
    }
  };

  useEffect(() => {
    const recipeId = '123'; // Exemple d'ID de recette, remplace-le par un ID réel
    fetchRecipe(recipeId);
  }, []);

  if (!recipe) {
    return <div>Chargement...</div>; // Affiche un message de chargement si la recette n'est pas encore récupérée
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeForm;
