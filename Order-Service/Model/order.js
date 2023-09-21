const mongoose = require("mongoose");
const {model_order}= require('../constants');
const orderSchema = new mongoose.Schema({
  productId: {type: String, required: true},
  user: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  created_at: {
    type: Date,
    default: Date.now()
  },
});


const Order= mongoose.model(model_order, orderSchema);
exports.Order=Order;
