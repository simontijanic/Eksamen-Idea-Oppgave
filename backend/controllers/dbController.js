const mongoose = require("mongoose")
const User = require("../models/userModel");
const Idea = require("../models/ideaModel");
const bcrypt = require("bcryptjs");

exports.connectTODB = async (req, res) => {
    mongoose.connect("mongodb://127.0.0.1:27017/ideas")
        .then( async () => {
            console.log("Connected to DB")   
          
        })
        .catch((err) => console.log(err));
};