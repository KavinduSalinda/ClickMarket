const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  console.log(req.body);
  // sending data
  // res.json(req.body);
  const { email, name, password, confirmPassword } = req.body;

  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({ 
      succes: false,
      message: "This email is already in use, try sign-in",
    });
  const user = await User({
    email,
    name,
    password,
  });
  // Save the user to the database
  await user.save();
  // send new user details
  res.json(user);
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  // Find the user with the given email
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      message: "User not found with the given email",
    });
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.json({
      success: false,
      message: "Email/password does not match",
    });
  }

  // creatin a token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const userInfo ={
    name:user.name,
    email:user.email,

  }
  // If the sign-in is successful, send the user object to front end
  res.json({ success: true, user,userInfo,  token });
};
