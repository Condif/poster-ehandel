// Add user controllers here
const User = require('../models/userModel')

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

// Get one user
exports.getUserById = async (req, res) => { 
    try {
        const user = await User.findOne({ _id: req.params._id });
        res.json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

// Register new user
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
}
    