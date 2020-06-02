const express = require("express");
const { check, validationResult } = require("express-validator");
const Document = require("../models/Document");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const DOCUMENT_TEMPLATES = require("../../client/src/commonConstants")
    .DOCUMENT_TEMPLATES;
const BlankValue = require("../models/Constants/BlankTemplate");
const LetterValue = require("../models/Constants/LetterTemplate");
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
        check("template", "Template must be present").isIn([
            DOCUMENT_TEMPLATES.BLANK,
            DOCUMENT_TEMPLATES.LETTER, //should map instead of writing in the event of more templates.
        ]),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { name, template } = req.body;

        try {
            let document = new Document({
                name: name,
                owner: req.user.id,
                content: // shoudl map here as well  in the event of more templates.
                    template === DOCUMENT_TEMPLATES.BLANK
                        ? BlankValue
                        : LetterValue,
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

        if (
            document.owner.toString() !== req.user.id &&
            document.collaborators.indexOf(req.user.id) === -1
        ) {
            return res.status(401).send("Unauthorized");
        }

        return res.status(200).json(document);
    } catch (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
            return res.status(404).send("Document not found");
        }
        return res.status(500).send("serverside errors");
    }
});

//GET /api/documents/share/:id used to get the emails of collaborators.
router.get("/share/:id", authMiddleware, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id)
            .select("owner collaborators")
            .populate({
                path: "collaborators",
                select: "email",
            });

        if (!document) {
            return res.status(400).send("Document not found");
        }

        if (document.owner.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }
        return res.status(200).json(document);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Serverside error");
    }
});

// PUT /api/documents/:id Used to update name only. Since the content is only updated through the socket io connection..
router.put(
    "/:id",
    authMiddleware,
    [check("name", "Name must not be empty").notEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;
        try {
            const document = await Document.findById(req.params.id);
            if (!document) {
                return res.status(404).send("Document not found");
            }

            if (
                document.owner.toString() !== req.user.id &&
                document.collaborators.indexOf(req.user.id) === -1
            ) {
                return res.status(401).send("Unauthorized");
            }

            document.name = name;
            await document.save();
            return res.status(200).send("Successfully renamed");
        } catch (errors) {
            return res.status(500).send("serverside errors");
        }
    }
);

// PUT /api/documents/share/:id. Used to add/remove collaborators.
router.put(
    "/share/:id",
    authMiddleware,
    [
        check("collaborator", "Pleas put a valid collaborator email").isEmail(),
        check(
            "share",
            "Share must be present and should either be true or false"
        ).isBoolean(),
    ],
    async (req, res) => {
        // this route is really long. maybe consider breaking it down into multiple routes.

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const document = await Document.findById(req.params.id);
            if (!document) {
                return res.status(404).send("Document not found");
            }

            let { collaborator: newCollaborator, share } = req.body;
            newCollaborator = await User.findOne({ email: newCollaborator });
            if (!newCollaborator) {
                return res.status(404).send("This user does not exist");
            }

            const index = document.collaborators.indexOf(newCollaborator._id);

            if (share) {
                // only the owner can add more collabortors.
                if (document.owner.toString() !== req.user.id) {
                    return res.status(401).send("Unauthorized");
                }
                if (index === -1) {
                    // we do nothing if the collaborator is already there.
                    document.collaborators.push(newCollaborator._id);
                    // you may want to move this out of the if condition since it happens for both checks but no, not a good idea becaue then it will
                    // do an unncessary db call even if the collabroator had already been added or even if he wasn't present in case of remove.
                    await document.save();
                }
                return res.status(200).send("Collaborator added");
            }

            if (!share) {
                //we let either the owner or the collaborator remove himself from collaborators.
                if (
                    document.owner.toString() !== req.user.id &&
                    newCollaborator._id.toString() !== req.user.id
                ) {
                    return res.status(401).send("Unauthorized");
                }
                if (index !== -1) {
                    // we do nothing if the collaborator is not present.
                    document.collaborators.splice(index, 1);
                    await document.save();
                }
                return res.status(200).send("Collaborator removed");
            }
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
