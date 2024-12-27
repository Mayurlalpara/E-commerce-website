const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    const token = req.header('auth-token'); // Get token from the headers
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, 'secret-ecomm'); // Verify the token
        req.admin = verified.admin; // Attach admin data to the request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = verifyAdminToken;
