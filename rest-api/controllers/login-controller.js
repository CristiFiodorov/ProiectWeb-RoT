const { getBodyFromRequest } = require('../utils/request-utils');
const { sendJsonResponse, sendTextResponse } = require('../utils/response-utils');
const { loginUserIfValid } = require('../services/login-service');

async function loginUser(req, res) {
    const body = await getBodyFromRequest(req);
    const loginCreds = JSON.parse(body);
    try {
        const token = await loginUserIfValid(loginCreds);
        sendJsonResponse(res, 200, JSON.stringify({"accessToken": token}));
    } catch (err) {
        sendTextResponse(res, 404, err.message);
    }
}

module.exports = {
    loginUser
}