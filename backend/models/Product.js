const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import du modèle Product

// Route pour obtenir un produit par ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product); // Renvoie les détails du produit
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

module.exports = router; // Export de la route
