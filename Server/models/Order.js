const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  customerName: String,
  phone: String,
  address: String,
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);