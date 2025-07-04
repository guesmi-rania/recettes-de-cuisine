const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Ajouter commande
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Liste commandes
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find().populate('products.product');
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

module.exports = router;
