const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
    const token = req.cookies.token;
    //checking token is present or not
    if (!token) {
        res.send("unauthenticated");
    }
    //checking correct token is present
    const payload = jwt.verify(token, process.env.secret);
    console.log(payload);
    req.payload = payload



    console.log(req.cookies.token);
    //caliing neext middleware
    next();

}
const isAdmin = (req, res, next) => {

    //checking user is vendor or not bu payload 
    if (req.payload.personType == "admin") {
        console.log("checking done");
        next();
    }
    else {
        res.send("Access denied");
    }

}
const isModerator = (req, res, next) => {

    //checking user is vendor or not bu payload 
    if (req.payload.personType == "moderator") {
        console.log("checking done");
        next();
    }
    else {
        res.send("Access denied");
    }

}
const isUser = (req, res, next) => {

    //checking user is victim or not bu payload 
    if (req.payload.personType == "user") {
        console.log("checking done");
        next();
    }
    else {
        res.send("Access denied");
    }

}
const isDonator = (req, res, next) => {
    //checking user is donator or not bu payload 
    if (req.payload.personType == "donator") {
        console.log("checking done");
        next();
    }
    else {
        res.send("Access denied");
    }

}
module.exports = { isAuth, isUser, isModerator, isAdmin };