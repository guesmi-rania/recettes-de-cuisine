import React, { useState, useEffect } from "react";
import "../styles/Slider.css";

const slides = [
  {
    image: "/images/delicious-cake-with-fruits-chocolate.jpg",
    alt: "Promo 1",
    title: "Une nouvelle saveur chaque jour",
    description: "Découvrez nos délicieuses pâtisseries artisanales",
    buttonText: "Commander Maintenant",
  },
  {
    image: "/images/delicious-candy-bar-with-mousse-desserts-biscuits-shape-hearts.jpg",
    alt: "Promo 2",
    title: "Gâteaux frais et gourmands",
    description: "Goûtez nos recettes traditionnelles et modernes",
    buttonText: "Voir les produits",
  },
  
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Changement automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Changer manuellement la slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : "inactive"}`}
        >
          {index === currentIndex && (
            <>
              <img src={slide.image} alt={slide.alt} />
              <div className="slide-text">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button>{slide.buttonText}</button>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="slider-donuts">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`donut ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
