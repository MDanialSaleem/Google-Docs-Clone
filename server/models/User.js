const mongoose = require("mongoose");


//This file describes the user model to be used by mongoose for working with mongodb.

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registerDate: {
        type: Date,
        default: Date.now(),
    },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
