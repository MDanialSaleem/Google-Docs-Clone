const keys = require("./constants.private");
module.exports = {
    mongoURI: `mongodb+srv://${keys.mongoUsername}:${keys.mongoPassword}@cluster0-0twgv.mongodb.net/test?retryWrites=true&w=majority`,
};
