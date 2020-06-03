const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const keys = require("../constants.private");
const router = express.Router();

//This file describes routes for handling users. It currently deals with three routes
// 1. Registering users.
// 2. Logging In users.
// 3. Getting user profile.

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: keys.sendgridKey,
        },
    })
);

// GET /api/users/resetpasswordtoken.
router.get("/resetpasswordtoken/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const payload = {
            user: {
                email: req.params.email,
            },
        };

        const user = User.find({ email });
        if (!user) {
            // You might want to tell the client that the email does not exist but that is a potential security flaw
            // which lets someone query our application for which addresses are registered.
            return res.status(200).send("OK");
        }
        jwt.sign(
            payload,
            keys.jwtSecret,
            { expiresIn: 10 * 60 }, //5 mins
            async (err, token) => {
                if (err) {
                    throw err;
                }

                await transporter.sendMail({
                    to: email,
                    from: "danialsaleem2010@gmail.com",
                    subject: "Email Reset Request",
                    html: `
                        <h1>You requested a password reset for you Kaghaz account.</h1>
                        <div>Find your token below and paste it in your kaghaz popup. It will be valid for 10 minutes.</div>
                        <div>${token}</div>
                        `,
                });
                res.status(200).send("OK");
            }
        );
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server side error");
    }
});

//GET /api/users
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -id");
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
});

//POST /api/users/login
router.post(
    "/resetpassword",
    [
        check("token", "Token is required").exists(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { token, password } = req.body;
        let email = null;
        try {
            const decoded = jwt.verify(token, keys.jwtSecret);
            email = decoded.user.email;
        } catch (err) {
            return res.status(400).json({
                errors: [
                    {
                        message: "Invalid credentials",
                    },
                ],
            });
        }

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

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            return res.status(200).send("Password Reset. Proceed to login");
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Server side error");
        }
    }
);
//POST /api/users/login
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

//POST /api/users
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
