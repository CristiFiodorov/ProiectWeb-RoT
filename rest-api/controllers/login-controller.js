const { getBodyFromRequest, sendTextResponse } = require('../helpers/http-helper');
const { sendJsonResponse } = require('../utils/response-utils');

async function loginUser(req, res) {
    const body = await getBodyFromRequest(req);
    const loginCreds = JSON.parse(body);
    try {
        const token = await loginUserIfValid(loginCreds);
        sendJsonResponse(res, 200, JSON.stringify({ token: token }));
    } catch (err) {
        sendTextResponse(res, 400, err);
    }
}

module.exports = { 
    loginUser
}