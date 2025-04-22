import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Pour créer des liens vers la page de détails

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes') // Assure-toi que l'URL correspond à ton backend
      .then(res => setRecipes(res.data))
      .catch(error => console.error('Erreur lors de la récupération des recettes', error));
  }, []);

  return (
    <div>
      <h2>Liste des Recettes</h2>
      {recipes.map((r, idx) => (
        <div key={idx}>
          <h3>{r.title}</h3>
          <p><strong>Ingrédients :</strong> {r.ingredients}</p>
          <p><strong>Instructions :</strong> {r.instructions}</p>
          <Link to={`/recipes/${r._id}`}>Voir la recette</Link> {/* Lien vers la page de détails */}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
