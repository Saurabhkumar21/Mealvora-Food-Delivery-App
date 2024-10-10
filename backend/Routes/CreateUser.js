import express from "express";
import { Router } from "express";
import User from "../models/User.js"; // Ensure to include .js in imports
import { body, validationResult } from "express-validator"; // Correct import
import bcrypt from "bcryptjs"; // Use ES module import for bcrypt
import jwt from "jsonwebtoken"; 
const jwtSecret = "MynamsisEndtoEndYouTubeChannel$#"

const router = express.Router();

// Route to create a new user
router.post("/createuser",
    [
        body('email').isEmail(), // Validate email
        body('name').isLength({ min: 5 }), // Validate name length
        body('password', 'Password should be at least 5 characters').isLength({ min: 5 }) // Validate password length
    ],
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            // Create a new user in the database
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
            console.log("User created successfully");

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Server error" });
        }
    }
);

// Route to login a user
router.post("/loginuser", [
    body('email').isEmail(), // Validate email
    body('password', 'Password should be at least 5 characters').isLength({ min: 5 }) // Validate password length
], async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        // Check if the user exists in the database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Invalid credentials, please try again." });
        }

        // Compare hashed password with the provided password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: "Invalid credentials, please try again." });
        }
        
        const data = {
            user : {
                id: user.id
            }
        }
        // If credentials match, return success
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({ success: true, authToken:authToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

export default router;
