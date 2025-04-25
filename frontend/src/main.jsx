import React from "react";
import ReactDOM from "react-dom/client"; // Importer depuis 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Utilisation de createRoot à la place de render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
