const mongoose = require('mongoose');

// Here I define the new schema for the order collection
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    toppings: String
  }],
  status: { type: String, default: 'Pending' } 
});

// Here I create the order from the schema to interact with the orders collection
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
