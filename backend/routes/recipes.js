const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Obtenir toutes les recettes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find(); // 👈 Ceci doit renvoyer un tableau
    res.json(recipes); // 👈 Tu DOIS envoyer un tableau ici
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
  }
});
  
// Obtenir une recette par ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id); // Recherche une recette par ID
    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.json(recipe); // Renvoie la recette par ID
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la recette' });
  }
});

// Ajouter une nouvelle recette
router.post('/', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({ title, ingredients, instructions });
    await newRecipe.save(); // Sauvegarde la nouvelle recette
    res.status(201).json(newRecipe); // Renvoie la recette ajoutée
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de la recette' });
  }
});

module.exports = router;
