//requiring modules
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//requiring authentication and authorization routes
const { isAuth, isAdmin, isUser, isModerator } = require('../middlewares/auth');
const { signup, login } = require('../controllers/auth');


//routes
router.post("/api/auth/signup", signup);
router.post("/api/auth/signin", login);
router.get('/main', isAuth, (req, res) => {
    const exist = req.payload;
    console.log("hii");
    console.log(exist);

    res.render('main', { exist });
});


module.exports = router;