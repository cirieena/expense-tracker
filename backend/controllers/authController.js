const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

//Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    //Validation: Check for missing fields
    if (!fullName || !email || !password || !profileImageUrl) {
        return res.status(400).json({ massage: "All fields are required" });
    }

    try {
        //Check if email already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ massage: "Email already in use" });
        }

        //Create the user
        const user = await User.create!!!!!!!


};

//Login User
exports.loginUser = async (req, res) => {}

//Register User
exports.getUserInfo = async (req, res) => {}