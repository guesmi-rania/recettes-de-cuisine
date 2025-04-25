const express = require("express");
const router = express.Router();
const Admin = require("../models/AdminModel"); // mise à jour ici

// Exemple simple de route de login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "motdepasse") {
    res.status(200).json({ success: true, message: "Connexion réussie" });
  } else {
    res.status(401).json({ success: false, message: "Identifiants invalides" });
  }
});

module.exports = router;
