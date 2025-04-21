const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Obtenir toutes les recettes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
  }
});

// Ajouter une nouvelle recette
router.post('/', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({ title, ingredients, instructions });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de la recette' });
  }
});

module.exports = router;
