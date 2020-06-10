const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers");

// const getUser = require("../Middlewares/getUser.js");

// Getting specific users
router.get("/byId", controller.getSpecificUsers)

// // Getting one
// router.get("/:_id", controller.getUserById)

// Creating one
router.post("/register", controller.registerNewUser);

router.put("/", controller.updateUser);

module.exports = router;
