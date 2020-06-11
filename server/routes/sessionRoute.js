const express = require("express");
const router = express.Router();

// Middlewares
const controller = require("../controllers/sessionControllers");

// Check logged in users
router.get("/checkLoginSession", controller.checkLoginSession);

// If post '/login', process login attempt
router.post("/login", controller.findUserByName, controller.login);

//If delete '/logout', process logout
<<<<<<< HEAD
router.post("/logout", (req, res) => {
  res.clearCookie("LoginSession");
  res.clearCookie("LoginSession.sig");
  console.log("Destroyed client session");
  res.json({ success: true, message: "You have been logged out" });
});
=======
router.post("/logout", controller.logout);
>>>>>>> master

module.exports = router;
