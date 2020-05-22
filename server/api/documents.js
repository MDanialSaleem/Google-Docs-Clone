const express = require("express");
const { check, validationResult } = require("express-validator");
const Document = require("../models/Document");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// This file describes routes for handling documents. It includes
// 1. Creating users.

// POST /api/documents/. used to create a new document.
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

            await document.save();

            return res.status(200).send("Doument created");
        } catch (err) {
            console.log(err);
            return res.status(500).send("server side error");
        }
    }
);

// DELETE /api/documents/:id. Used to delete a document by id.
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        let document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).send("Document not found");
        }

        if (document.owner.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }

        await document.remove();

        return res.status(200).send("Document Deleted");
    } catch (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
            return res.status(404).send("Document not found");
        }
        return res.status(500).send("serverside errors");
    }
});

// GET /api/documents/:id. Used to get a single document.
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).send("Document not found");
        }

        // if (document.owner.toString() !== req.user.id) {
        //     return res.status(401).send("Unauthorized");
        // }

        return res.status(200).json(document);
    } catch (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
            return res.status(404).send("Document not found");
        }
        return res.status(500).send("serverside errors");
    }
});

// PUT /api/documents/:id. Used to add collaborators.
router.put(
    "/:id",
    authMiddleware,
    [check("collaborator", "Pleas put a valid collaborator email").isEmail()],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const document = await Document.findById(req.params.id);
            if (!document) {
                return res.status(404).send("Document not found");
            }

            if (document.owner.toString() !== req.user.id) {
                return res.status(401).send("Unauthorized");
            }

            let { collaborator } = req.body;
            collaborator = await User.findOne({ email: collaborator });

            if (!collaborator) {
                return res.status(404).send("This user does not exist");
            }

            if (
                document.collaborators.filter(
                    (currCollaborator) => currCollaborator === collaborator._id
                ).length === 0
            ) {
                // we do nothing if the collaborator is already there.
                document.collaborators.push(collaborator._id);
                await document.save();
            }
            return res.status(200).send("Collaborator added");
        } catch (err) {
            console.log(err);
            if (err.kind === "ObjectId") {
                return res.status(404).send("Document not found");
            }
            return res.status(500).send("serverside errors");
        }
    }
);
module.exports = router;
