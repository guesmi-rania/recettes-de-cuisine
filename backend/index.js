const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const clientRoutes = require('./routes/clients');
const authRoutes = require('./routes/auth');     // pour login/register user
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["https://frontend-recettes-fxc8.onrender.com", "http://localhost:3000"]
}));


app.use(express.json());

// Ici on monte les routes
app.use('/api/clients', clientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connexion à MongoDB réussie');
    app.get('/', (req, res) => {
      res.send('Backend API fonctionne !');
    });
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB :', err.message);
  });
