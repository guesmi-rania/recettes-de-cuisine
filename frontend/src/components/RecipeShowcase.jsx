import React from "react";
import "../styles/RecipeShowcase.css";

function RecipeShowcase() {
  return (
    <section className="recipe-showcase">
      <h2>Les Astuces du Chef 👨‍🍳</h2>
      <div className="recipe-cards">
        <div className="recipe-card">
          <h3>Astuce #1</h3>
          <p>Utilisez du beurre doux pour une texture plus fondante dans les gâteaux.</p>
        </div>
        <div className="recipe-card">
          <h3>Astuce #2</h3>
          <p>Pour une pâte sablée réussie, ne travaillez pas trop la pâte pour garder sa friabilité.</p>
        </div>
        <div className="recipe-card">
          <h3>Astuce #3</h3>
          <p>Ajoutez une pincée de sel dans vos desserts pour sublimer le goût du sucre !</p>
        </div>
      </div>
    </section>
  );
}

export default RecipeShowcase;
