// Add user controllers here
const User = require("../models/userModel");
const ServerError = require("../serverError");

// Get specific users
exports.getSpecificUsers = async (req, res) => {
  const users = await User.find({ adminRequest: "admin" }).select("-password");
  if (!users) {
    throw new ServerError("The source does not exist", 404);
  }
  res.json(users);
};

exports.updateUser = async (req, res) => {
  let user = req.body;
  const userToUpdate = await User.findOne({ _id: user._id }).select(
    "-password"
  );
  if (!userToUpdate) {
    throw new ServerError("No such user", 404);
  }
  userToUpdate.role = user.role;
  userToUpdate.adminRequest = user.adminRequest;

  await userToUpdate.save();
  res.json("User updated");
};

//Get logged in user
exports.getLoggedInUser = async (req, res) => {
  const user = await User.findOne({ _id: req.session.id }).select("-password");
  res.json(user);
};

// Register new user
exports.registerNewUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    adminRequest: req.body.adminRequest,
    deliveryAddress: req.body.deliveryAddress,
  });
  if (!user) {
    throw new ServerError("The user was not created", 400);
  }
  const newUser = await user.save();
  res.status(201).json({ newUser });
};
