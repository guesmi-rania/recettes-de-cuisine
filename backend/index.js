require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clients');

const app = express();
const PORT = process.env.PORT || 5000;

// Liste des origines autorisées
const allowedOrigins = [
  'https://frontend-recettes-fxc8.onrender.com',  // Ton frontend Render
  'https://guesmi-rania.github.io'               // Si tu déploies aussi sur GitHub Pages
];

// Middleware CORS avec vérification d’origine dynamique
app.use(cors({
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origine (comme Postman, Curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS non autorisé pour cette origine'), false);
    }
  },
  credentials: true // Si tu veux autoriser les cookies (sinon tu peux l'enlever)
}));

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/clients', clientRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connexion à MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
  });
