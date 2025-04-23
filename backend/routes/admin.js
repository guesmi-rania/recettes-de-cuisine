const express = require('express');
const router = express.Router();

// Middleware pour vérifier les identifiants admin
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ message: 'Connexion réussie' });
  } else {
    res.status(401).json({ message: 'Identifiants incorrects' });
  }
});

module.exports = router;
