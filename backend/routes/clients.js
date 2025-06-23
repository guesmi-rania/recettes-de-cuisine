const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const bcrypt = require("bcryptjs");

// POST /api/clients/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si email déjà utilisé
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création et sauvegarde du client
    const newClient = new Client({ name, email, password: hashedPassword });
    await newClient.save();

    res.status(201).json({ message: "Client enregistré avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Export
module.exports = router;
