const mongoose = require("mongoose");

//This file describes the user model to be used by mongoose for working with mongodb. Kind of like how
// we use schemas to describe tabels in sql.

const userSchema = new mongoose.Schema(
    {
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
    },
    {
        // this enables something called virtuals which are explained in detail at the end..
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// the name is added as the field in this schema.
userSchema.virtual("owndocs", {
    ref: "document", //the model we are referring.
    localField: "_id", //PK of this
    foreignField: "owner", //PK of the other table.
    justOne: false,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
