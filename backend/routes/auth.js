const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Import bcryptjs

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    // Hash du mot de passe avant sauvegarde
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crée et enregistre l'utilisateur avec le mot de passe hashé
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Recherche l'utilisateur
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Compare le mot de passe fourni avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    res.json({ message: "Connexion réussie", token: "fake-jwt-token" });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
