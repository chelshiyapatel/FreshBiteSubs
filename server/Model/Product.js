const mongoose = require('mongoose');

// Here I defined the new schema for the product collectio
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

// Here I created the product from the schema to interact with the procduct collection
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
