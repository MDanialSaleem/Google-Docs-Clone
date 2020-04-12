const mongoose = require("mongoose");
const constants = require("./constants");

const connectDB = async () => {
    try {
        await mongoose.connect(constants.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("mongo db connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
