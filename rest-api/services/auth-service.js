const { sendJsonResponse } = require('./response-utils');

const jwt = require('jsonwebtoken');


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

function authentificateToken(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        sendJsonResponse(res, 401, JSON.stringify({ message: "Unauthorized" }));
        return false;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            sendJsonResponse(res, 403, JSON.stringify({ message: "Forbidden" }));
            return false;
        }
        req.user = user;
    });
    return true;
}

module.exports = {
    authentificateToken,
    generateAccessToken
}