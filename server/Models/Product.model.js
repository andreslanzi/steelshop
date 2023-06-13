const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    title: String,
    description: String,
    thumbnail: String,
    price: String,
    discountPercentage: Number,
    stock: Number,
    rating: Number,
    brand: String,
    category: String
  },
  {
    versionKey: false
  }
);

const Product = mongoose.model('products', productSchema);

module.exports = Product;
