const Product = require("../models/products"); // Import the Product model

const {getImageUrl} = require("../helper/imageUrl");

exports.createProduct = async (req, res) => {
  // console.log(req.body);
  const imageUrl = await getImageUrl();
  console.log("Image URL:", imageUrl);

  // Destructure the product data from the request body
  const { id, name, price, description, stockCount } = req.body;
  let image = imageUrl;
  // console.log(image);
  // Check if the product with the given ID already exists
  const isExistingProduct = await Product.isThisProductIn(id);
  if (isExistingProduct) {
    return res.json({
      success: false,
      message: "This product is already in the database",
    });
  } 

  try {
    // Create a new Product instance
    const newProduct = new Product({
      id,
      name,
      price,
      description,
      stockCount,
      image,
    });
    
    // Save the new product to the database
    await newProduct.save();
    console.log(newProduct);
    // Send the newly created product as a response
    res.json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};
