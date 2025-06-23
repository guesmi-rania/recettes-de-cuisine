require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clients');

const app = express();
const PORT = process.env.PORT || 5000;

// Liste des origines autorisées
const allowedOrigins = [
  'https://frontend-recettes-fxc8.onrender.com',
  'https://guesmi-rania.github.io'
];

// CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS non autorisé pour cette origine'), false);
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes API
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/clients', clientRoutes);

// Servir le frontend Vite (dans /public/dist)
app.use(express.static(path.join(__dirname, 'public', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

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
