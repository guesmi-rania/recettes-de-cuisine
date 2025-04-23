import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ProductImages from "../components/ProductImages";
import RecipeShowcase from "../components/RecipeShowcase"; // ✅ Correction ici
import AboutUs from "../components/AboutUs";

function Home() {
  return (
    <>
      <Header />
      <Slider />
      <Categories />
      <ProductImages />
      <RecipeShowcase /> {/* ✅ Correction ici aussi */}
      <AboutUs />
      <Footer />
    </>
  );
}

export default Home;
