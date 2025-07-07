import React from "react";
import RecipeShowcase from "../components/RecipeShowcase";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import CategoryExplore from "../components/CategoryExplore";
import "../styles/Home.css";


function Home() {
  return (
    <div className="home-page">
      <header>
        {/* Ta barre de menu ici */}
        
      </header> 

    
      <div className="main-content">
     


      </div>
      <hr className="section-separator" />

       {/* Autres sections */}
       <CategoryExplore />
      {/* Autres sections */}
      <hr className="section-separator" />

      {/* Autres sections en dessous */}
      <div className="below-sections">
        <RecipeShowcase />
        <hr className="section-separator" />

        <AboutUs />
        <hr className="section-separator" />

        <Footer />
      </div>
    </div>
  );
}

export default Home;
