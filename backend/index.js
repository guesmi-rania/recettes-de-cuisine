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

const allowedOrigins = [
  'https://frontend-recettes-fxc8.onrender.com',
  'https://guesmi-rania.github.io'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS non autorisé pour cette origine'), false);
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/clients', clientRoutes);

// Si tu sers aussi le frontend depuis le backend (optionnel)
app.use(express.static(path.join(__dirname, 'public', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connexion à MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
  });
