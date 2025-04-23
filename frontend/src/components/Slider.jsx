import React, { useState, useEffect } from 'react';
import "../styles/Slider.css";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { image: '/images/slider1.jpg', title: 'Nouveaux Gâteaux', description: 'Découvrez nos nouveaux gâteaux' },
    { image: '/images/slider2.jpg', title: 'Sélection de Pâtisseries', description: 'Pâtisseries artisanales faites maison' },
    { image: '/images/slider3.jpg', title: 'Offres Spéciales', description: 'Profitez de nos promotions' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="slide">
        <img src={slides[currentIndex].image} alt={slides[currentIndex].title} />
        <div className="caption">
          <h3>{slides[currentIndex].title}</h3>
          <p>{slides[currentIndex].description}</p>
        </div>
      </div>
    </div>
  );
}

export default Slider;
