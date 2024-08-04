const express = require("express");
const { User } = require("../db/model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    return res.json({message: "Welcome to userRouter"})
});

// Signup
userRouter.post("/signup", async (req, res) => {

    try{
        const existingUser = await User.findOne({email: req.body.email});

        if(existingUser) {

        return res.status(400).json({error: "User already exists, try Signing in."});

        }

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        const token = jwt.sign(user._id, process.env.JWT_SECRET);

        return res.status(200).json({message: "Signup successfull!", token: token});

    } catch(err) {

        return res.status(400).json({error: err});

    }

});

module.exports = userRouter; 