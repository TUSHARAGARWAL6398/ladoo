const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("../meraVocabani/models/userModel");
const app = express();
const path = require('path')
const authroute = require("./routes/auth");



const flash = require("connect-flash");
const mongoose = require('mongoose')

const bcrypt = require('bcrypt');
const dbConnect = require('./configure/db');

require('dotenv').config();
console.log(process.env.dbUrl);

//middlewares

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(authroute)
// app.use(userroute)


//db connection
dbConnect();

//routes
app.get("/", (req, res) => {
    res.render('home')
});

app.get("/signup", (req, res) => {
    res.render('signupForm')
});
app.get("/signin", (req, res) => {
    res.render('signinForm')
});

// app.get('/main', (req, res) => {
//     const username = req.query.username;
//     const userId = req.session.userId;
//     res.render('main', { username, userId });
// });

// app.get("/delete/", (req, res) => {
//     res.render('confirmDelete')
// });

//listening at port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});