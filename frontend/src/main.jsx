import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css";
import "./styles/Home.css";
import "./styles/ProductList.css";
import "./styles/ProductDetail.css";
import "./styles/TastingList.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
