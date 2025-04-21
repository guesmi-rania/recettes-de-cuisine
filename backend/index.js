const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Permet les requêtes depuis d'autres domaines

// Connexion à MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

// Exemple de route
app.get('/api/recipes', (req, res) => {
  // Logique pour récupérer les recettes depuis la base de données
  res.json({ message: 'Liste des recettes' });
});

// Sert les fichiers statiques du frontend React
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// Route fallback pour servir index.html (frontend React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
