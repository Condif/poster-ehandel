// Add user controllers here
const User = require("../models/userModel");
const ServerError = require("../serverError");

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users.length) {
    throw new ServerError("The source does not exist", 404);
  }
  res.json(users);
};

// Get one user
exports.getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params._id });
  if (!user) {
    throw new ServerError("The user does not exist", 404);
  }
  res.json(user);
};

// Register new user
//TODO testa detta med frontenden errorhandler
exports.registerNewUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    deliveryAddress: req.body.deliveryAddress,
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (err) {
    // res.status.apply(400).json({ message: err.message })
    res.status(400).json({ message: err.message });
  }
};
