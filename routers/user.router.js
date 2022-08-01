const express = require('express');
const bodyParse = require('body-parser');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/login', controller.getLoginPage);

router.post('/login', controller.handleLogin);

// router.get('/signup', controller.getSignupPage);

router.post('/signup', controller.handleSignup);

module.exports = router;