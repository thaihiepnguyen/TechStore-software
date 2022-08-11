const express = require("express");
const bodyParser = require("body-parser")
const userModel = require("../model/user.models");
const router = express.Router();
const controller = require('../controllers/user.controllers');
const app = express();
app.use(bodyParser.json())

router.get('/login', controller.getLoginPage);

router.post('/api/login', controller.handleLogin);

router.get('/signup', controller.getSignupPage);

router.post('/api/signup', controller.handleSignup);

module.exports = router;



// module.exports = app