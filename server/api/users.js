const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

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
