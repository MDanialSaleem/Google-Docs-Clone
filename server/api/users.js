const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const keys = require("../constants.private");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
});

router.post(
    "/login",
    [
        check("email", "Email is required").exists(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    errors: [
                        {
                            message: "Invalid credentials",
                        },
                    ],
                });
            }

            const isMatched = await bcrypt.compare(password, user.password);

            if (!isMatched) {
                return res.status(400).json({
                    errors: [
                        {
                            message: "Invalid credentials",
                        },
                    ],
                });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                keys.jwtSecret,
                { expiresIn: 3600000 },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).json({ token });
                }
            );
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Server side error");
        }
    }
);

router.post(
    "/",
    [
        check(
            "name",
            "Name cannot be empty and can only contain letters and numbers"
        )
            .not()
            .isEmpty()
            .isAlphanumeric(),
        check("email", "give a valid email email address").isEmail(),
        check(
            "password",
            "Password must be at least 8 characters long"
        ).isLength({ min: 8, max: undefined }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [{ message: "User already exists" }],
                });
                //this struture is followed so that our api returns error to the front end
                //with the same strucutre in order to be uniformly accessed and displayed.
            }

            user = new User({
                name,
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();

            return res.status(200).send(`User registered: ${user.name}`);
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Server side error");
        }
    }
);

module.exports = router;
