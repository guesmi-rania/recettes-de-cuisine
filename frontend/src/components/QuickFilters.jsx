import React from "react";
import "../styles/QuickFilters.css";

export default function QuickFilters({ onSort }) {
  return (
    <div className="quick-filters">
      <button onClick={() => onSort("asc")}>Prix Croissant</button>
      <button onClick={() => onSort("desc")}>Prix Décroissant</button>
    </div>
  );
}
