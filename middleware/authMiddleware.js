const jwt = require("jsonwebtoken");

exports.Authenticate = (req, res, next) => {
    const token = req.header.auth;
    if (!token) {
        return res.status(401).json({ msg: "Access denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
}
