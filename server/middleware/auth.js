const jwt = require("jsonwebtoken");
const keys = require("../constants.private");


// This middleware extracts the jwt token from the request if it has a valid one, and sets the user field
// to an object that contains the user id, otherwise it denies the request.
module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res
            .status(401)
            .json({ errors: [{ message: "No token. Authorization denied" }] });
    }

    try {
        const decoded = jwt.verify(token, keys.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        //runs if the tokens is not valid.
        return res
            .status(401)
            .json({
                errors: [{ message: "Invalid token. Authorization denied" }],
            });
    }
};
