const express = require("express");
const router = express.Router();

// Middlewares
const controller = require("../controllers/sessionControllers");
// const getUser = require('../Middlewares/getUser.js')
// const login = require('../Middlewares/login.js')
// const checkloginSession = require('../Middlewares/checkLoginSession.js')

// Check logged in users
router.get('/checkLoginSession', controller.checkLoginSession)

// If post '/login', process login attempt
router.post('/login', controller.findUserByName, controller.login)

//If delete '/logout', process logout
router.delete('/logout', (req, res) => {
    req.session = null
    console.log('Destroyed client session');
    
    res.json('Logged out!')
})

module.exports = router;