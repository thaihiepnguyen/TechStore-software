const express = require('express');
const bodyParse = require('body-parser');
const router = express.Router();
const controller = require('../controllers/user.controller');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const User = require('../models/user.model');

router.get('/login', controller.getLoginPage);

router.post('/login', controller.handleLogin);

router.get('/signup', controller.getSignupPage);

router.post('/api/signup', upload.single('avatar'), controller.handleSignup);

router.get('/:username', async (req, res) => {

    console.log(req.cookies.userId)
    let this_user = await User.findOne({username: req.cookies.userId})

    console.log(this_user)
    res.render('user/profile.pug', {
        user: this_user
    })
})

module.exports = router;