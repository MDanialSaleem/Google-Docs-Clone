const mongoose = require("mongoose");
const InitialValue = require("./Constants/InitialValue");
// This file describes the document model.

const documentSchema = mongoose.Schema({
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
        default: InitialValue,
    },
});

const documentModel = mongoose.model("document", documentSchema);
module.exports = documentModel;
