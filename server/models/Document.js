const mongoose = require("mongoose");
const InitialValue = require("./Constants/InitialValue");
const Letter = require("./Constants/Letter");

// This file describes the document model. kind of like how we use schemas to describe tables in sql.

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    lastModified: {
        type: Date,
        required: true,
        default: Date.now,
    },
    content: {
        type: Array,
        required: true,
        default: Letter,
    },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const documentModel = mongoose.model("document", documentSchema);
module.exports = documentModel;
