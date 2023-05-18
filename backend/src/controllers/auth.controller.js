const express = require("express");

const router = express.Router();
const  User  = require("../models/user.model");
const authenticate = require("../middlewares/authenticate.middleware.js");

const { ApiHelper, JwtHelper } = require("../utils");


router.post("/register", async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return ApiHelper.generateApiResponse(
                res,
                req,
                "All fields required.",
                400
            );
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return ApiHelper.generateApiResponse(
                res,
                req,
                "User with same email already exist",
                409
            );
        }

        const existingUsername = await User.findOne({
            name: req.body.name,
        });

        if (existingUsername) {
            return ApiHelper.generateApiResponse(
                res,
                req,
                "User with same name already exist",
                409
            );
        }

        let user = await User.create(req.body);

        user = await User.findOne(
            { email: req.body.email },
            { password: 0, token: 0 }
        );

        ApiHelper.generateApiResponse(
            res,
            req,
            "User registered successfully",
            201,
            user
        );
    } catch (error) {
        ApiHelper.generateApiResponse(
            res,
            req,
            "Something went wrong while registering.",
            500
        );
    }
});


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
            .select("password")
            
        if (!user) {
            return ApiHelper.generateApiResponse(
                res,
                req,
                "Invalid credentials, either email or password are wrong.",
                401
            );
        }

        const match = user.checkPassword(req.body.password);

        console.log(match)

        if (!match) {
            return ApiHelper.generateApiResponse(
                res,
                req,
                "Invalid credentials, either email or password are wrong.",
                401
            );
        }

        
        let payload = { user_id: user._id };
        const token = await JwtHelper.sign(payload);

        await User.findByIdAndUpdate(user._id, { token });

        ApiHelper.generateApiResponse(
            res,
            req,
            "User logged in successfully.",
            200,
            { token }
        );
    } catch (error) {
        ApiHelper.generateApiResponse(
            res,
            req,
            "Something went wrong, please try again",
            500
        );
    }
});


module.exports = router;