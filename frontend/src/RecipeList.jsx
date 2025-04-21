import { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes').then(res => setRecipes(res.data));
  }, []);

  return (
    <div>
      <h2>Liste des Recettes</h2>
      {recipes.map((r, idx) => (
        <div key={idx}>
          <h3>{r.title}</h3>
          <p><strong>Ingrédients :</strong> {r.ingredients}</p>
          <p><strong>Instructions :</strong> {r.instructions}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
