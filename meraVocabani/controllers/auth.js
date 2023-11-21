const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
require("dotenv").config();




const signup = async (req, res) => {
    //data fetching

    [req.body.roles] = req.body.roles;
    console.log(req.body);



    //checking user exist or not
    let exist = await User.findOne({ email: req.body.email });

    //verication otp and send 
    //render verification

    console.log(exist);
    if (exist) {
        res.send("user toh hain ");
    }
    //Hashing password
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashPassword);
    req.body.password = hashPassword;
    //creating user in database 
    const user = new User(req.body);
    await user.save();
    console.log(user + "  jjjh");
    res.send("ho gya");
};


const login = async (req, res) => {
    //data fetching
    console.log(req.body);

    //checking user exist or not and usne role sahi bhara hain ya nahi
    let exist = await User.findOne({ username: req.body.username });
    if (!exist || exist.personType != req.body.personType) {
        res.send("user register nhi hain ");
    }

    else {
        //checking password valid hain ya nahi
        const validPassword = await bcrypt.compare(req.body.password, exist.password);
        console.log(validPassword);

        const payload = {
            exist: exist.username,
            id: exist._id,
            personType: exist.personType
        }
        console.log("paylod");
        console.log(payload);
        if (validPassword) {
            const token = jwt.sign(payload, process.env.secret, { expiresIn: '24h' });
            console.log(token);
            exist = exist.toObject();
            exist.token = token;
            exist.password = undefined;

            res.cookie("token", token, { expires: new Date(Date.now() + 60 * 60 * 24 * 1000), httpOnly: true }).render('main.ejs', { exist });

        }
        else {
            res.send("Email ya password ya role galat hain");
        }


    }

}
module.exports = { signup, login };