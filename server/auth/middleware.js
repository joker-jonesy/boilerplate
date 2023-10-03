const jwt = require("jsonwebtoken");
const protection = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = decoded;
            next();
        } catch (error) {
            console.error(error.message);
            res.status(401).json({ message: "Not authorized" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized" });
    }
};

module.exports = protection;