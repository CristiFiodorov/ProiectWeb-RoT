const { getBodyFromRequest } = require('../utils/request-utils');
const { sendJsonResponse, sendEmptyResponse } = require('../utils/response-utils');
const { registerUserIfValid } = require('../services/register-service');

async function registerUser(req, res) {
    const body = await getBodyFromRequest(req);
    const registeredUser = JSON.parse(body);
    try {
        await registerUserIfValid(registeredUser);
        sendEmptyResponse(res, 200);
    } catch (err) {
        sendJsonResponse(res, 400, err.message);
    }
}

module.exports = {
    registerUser
}