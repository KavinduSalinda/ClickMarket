const mongoose = require("mongoose");

///////////////////////////////////////
const productSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: { 
    type: String 
  },
  stockCount: {
    type: Number,
    default: 0, // Set a default value of 0 for 'stockCount'
  },///////////////////////////////======================
});

// Define the isThisProductIn method to check if a product with the given ID exists
productSchema.statics.isThisProductIn = async function (productId) {
  const product = await this.findOne({ id: productId });
  return !!product; // Returns true if a product with the given ID exists, false otherwise
};

module.exports = mongoose.model("Product", productSchema);
