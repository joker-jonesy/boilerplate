const jwt = require("jsonwebtoken");
const process = require("process");
const protection = async (req, res, next) => {
    console.log("auth middleware invoked")
    const token = req.headers.authorization

    console.log("extracted token:", token)
    if (!token) {
        return res.status(401).send("No token provided.");
    }

    try {
        req.user = jwt.verify(token, process.env.JWT);
        console.log("middleware req.user", req.user)
        next();
    } catch (error) {
        console.log("Token verification error:", error.message);
        return res.status(403).send("Failed to authenticate token.")
    }
};

module.exports = protection;