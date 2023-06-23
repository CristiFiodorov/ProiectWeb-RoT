const { sendJsonResponse } = require('../utils/response-utils');

const User = require('../models/user-scheme');
const jwt = require('jsonwebtoken');

async function isUserAdmin(user) {
    const foundUser = await User.findById(user._id);
    if (!foundUser) {
        throw new Error("User not found.");
    }
    return foundUser.isAdmin;
}

async function generateAccessToken(user) {
    const isAdmin = await isUserAdmin(user);
    return jwt.sign({ "id": user._id.toString(), "isAdmin": isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}

function verifyToken(req, res, params, isAdmin, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    
    if (token === null || token == 'null') {
        return sendJsonResponse(res, 401, JSON.stringify({ message: "Unauthorized" }));
    }

    const verifyResponse = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return false;
        }
        req.user = payload;
        return true;
    });


    if (!verifyResponse) {
        sendJsonResponse(res, 403, JSON.stringify({ message: "Forbidden" }));
        return;
    }
    if (isAdmin && !req.user.isAdmin) {
        return sendJsonResponse(res, 403, JSON.stringify({ message: "Forbidden" }));
    }
    next(req, res, params);
}

module.exports = {
    verifyToken,
    generateAccessToken,
}