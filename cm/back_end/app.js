const express = require("express");
require("dotenv").config();
require("./models/db");
const userRouter = require("./routes/user");
const { uploadToCloudinary } = require("./helper/imageUpload");

const User = require("./models/user");
const Products = require("./models/products");
const multer = require("multer");
const { uploadtoCloudinarymiddleware } = require("./middlewares/productupload");

const app = express();
app.use(express.json());
app.use(userRouter);

// }
const test = async (email, password) => {
  const user = await User.findOne({ email: email });
  console.log("User:", user); // Check if user is null or an actual user object
  if (!user) {
    console.log("User not found"); // Log if user is not found
    return;
  }
  const result_p = await user.comparePassword(password);
  console.log("Password comparison result:", result_p);
};

////////////////////////////////////////////////////////////
// Define an API endpoint to fetch all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//sendin data to front end
// app.get('/hi', (req,res)=>{
//     res.send('hi world lklkl')
// })









const port = 8000;
app.listen(port, () => {
  console.log(`Hi console! Im on port ${port}`);
});


//npm install
//npm install jsonwebtoken
//npm instali multer>>> for image >> v- 10
//npm install sharp >> image library
// photopea
// npm install cloudinary
// npm install react-native-network-info
