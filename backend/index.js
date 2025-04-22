const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const recipesRoutes = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5000;
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);
const cors = require('cors');

// Middleware CORS
app.use(cors({
  origin: "https://5173-idx-recettes-de-cuisinegit-1745333535364.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev",
  credentials: true
}));


app.use(express.json());

// Routes API
app.use('/api/recipes', recipesRoutes);

// Connexion MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://raniaguesmi:AhfnzsUoS3gnIfNe@cluster2.stjl3ql.mongodb.net/recettes?retryWrites=true&w=majority&appName=Cluster2';

if (!mongoURI) {
  console.error('❌ MongoDB URI is not définie');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connecté');
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB :', err);
});
