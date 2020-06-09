const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers");

// const getUser = require("../Middlewares/getUser.js");

// // Getting all
// router.get("/", controller.getAllUsers)

// // Getting one
// router.get("/:_id", controller.getUserById)

// Creating one
router.post("/register", controller.registerNewUser);

module.exports = router;
