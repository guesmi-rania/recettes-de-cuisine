require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5173', 'https://frontend-recettes-fxc8.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Middleware JSON
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Servir le frontend React buildé
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// Route fallback pour SPA (React Router)
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// Connexion MongoDB + démarrage serveur
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ Connecté à MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB :', err.message);
});
