const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers");

// Creating one
router.post("/register", controller.registerNewUser);

module.exports = router;
