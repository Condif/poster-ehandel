const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/userModel");

// const getUser = require("../Middlewares/getUser.js");

//Getting all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Creating one
router.post("/", async (req, res) => {
    
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
  });

  module.exports = router;