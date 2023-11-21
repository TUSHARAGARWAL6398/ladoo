const mongoose = require("mongoose");
require("dotenv").config();

const db = () => {
    mongoose.connect(process.env.dbUrl)
        .then(() => {
            console.log("Successfully connect to MongoDB.");
        })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });
}

module.exports = db;
