const express = require("express");
const { check, validationResult } = require("express-validator");
const Document = require("../models/Document");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// This file describes routes for handling documents. It includes
// 1. Creating users.

router.post(
    "/",
    authMiddleware,
    [
        check("name", "Name is required").not().isEmpty(),
        check(
            "name",
            "Name must be a string with at max 20 characters"
        ).isLength({ max: 20 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { name } = req.body;

        try {
            let document = new Document({
                name: name,
                owner: req.user.id,
            });

            await document.save()

            return res.status(200).send("Doument created");
        } catch (err) {
            console.log(err);
            return res.status(500).send("server side error");
        }
    }
);

module.exports = router;
