const express = require('express');
const bodyParse = require('body-parser');
const router = express.Router();
const controller = require('../controllers/user.controller');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const jwt = require('jsonwebtoken');

router.get('/login', controller.getLoginPage);

router.post('/login', controller.handleLogin);

router.get('/signup', controller.getSignupPage);

router.post('/api/signup', upload.single('avatar'), controller.handleSignup);

module.exports = router;