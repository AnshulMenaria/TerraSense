const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.tester = verified; // Attach tester details from token
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
