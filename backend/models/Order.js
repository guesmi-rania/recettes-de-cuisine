const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  clientName: String,
  clientEmail: String,
  address: String,
  totalPrice: Number,
  status: { type: String, default: "En cours" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
