const { sendJsonResponse } = require('../utils/response-utils');

const jwt = require('jsonwebtoken');


function generateAccessToken(user) {
    return jwt.sign({"id": user._id.toString()}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return sendJsonResponse(res, 401, JSON.stringify({ message: "Unauthorized" }));
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return sendJsonResponse(res, 403, JSON.stringify({ message: "Forbidden" }));
        }
        req.user = user;
        console.log(req.user);
    });
    next();
}

module.exports = {
    verifyToken,
    generateAccessToken
}