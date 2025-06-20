import React from "react";
import "../styles/RecipeShowcase.css";

const astuces = [
  {
    title: "Astuce #1",
    text: "Utilisez du beurre doux pour une texture plus fondante dans les gâteaux.",
    image: "/images/astuces/beurre.jpg",
  },
  {
    title: "Astuce #2",
    text: "Pour une pâte sablée réussie, ne travaillez pas trop la pâte pour garder sa friabilité.",
    image: "/images/astuces/pate-sablee.jpg",
  },
  {
    title: "Astuce #3",
    text: "Ajoutez une pincée de sel dans vos desserts pour sublimer le goût du sucre !",
    image: "/images/astuces/sel-dessert.jpg",
  },
  {
    title: "Astuce #4",
    text: "Laissez reposer vos pâtes au frais pour une meilleure tenue à la cuisson.",
    image: "/images/astuces/repos-pate.jpg",
  },
  {
    title: "Astuce #5",
    text: "Utilisez un tamis pour incorporer la farine sans grumeaux.",
    image: "/images/astuces/tamis.jpg",
  },

];

function RecipeShowcase() {
  return (
    <section className="recipe-showcase full-width">
      <h2>Les Astuces du Chef Lotfi 👨‍🍳</h2>
      <div className="recipe-grid">
        {astuces.map((astuce, index) => (
          <div key={index} className="recipe-card">
            <img src={astuce.image} alt={astuce.title} className="recipe-image" />
            <h3>{astuce.title}</h3>
            <p>{astuce.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecipeShowcase;
