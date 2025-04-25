import React from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import RecipeShowcase from "../components/RecipeShowcase";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <header>
        {/* Ta barre de menu ici */}
      </header>
      
      <div className="main-content">
        <aside className="categories-sidebar">
          <Categories /> {/* Affichage des catégories ici */}
        </aside>

        <div className="slider-container">
          <Slider /> {/* Le slider ici, avec une taille réduite */}
        </div>
      </div>

      {/* Autres sections en dessous */}
      <div className="below-sections">
        <RecipeShowcase />
        <AboutUs />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
