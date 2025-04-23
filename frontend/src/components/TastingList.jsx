import React from 'react';
import "../styles/TastingList.css";

function TastingList() {
  return (
    <div className="tasting-list">
      <h2>Dégustations à venir</h2>
      <ul>
        <li>15 mai 2025 - Atelier sucré</li>
        <li>20 mai 2025 - Brunch salé</li>
      </ul>
    </div>
  );
}

export default TastingList;
