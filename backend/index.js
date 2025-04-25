const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv');

dotenv.config(); // Chargement des variables d'environnement

const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/adminRoutes'); // Choisis bien celui que tu veux vraiment

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connexion à MongoDB réussie');
    app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
  });
