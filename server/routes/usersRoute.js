const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/userModel");
const controller = require('../controllers/userControllers')

// const getUser = require("../Middlewares/getUser.js");

//Getting all
router.get("/", controller.getAllUsers)

//Getting one
router.get("/:_id", controller.getUserById)

//Creating one
router.post("/register", controller.registerNewUser)

module.exports = router;