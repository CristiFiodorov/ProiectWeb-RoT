const { getBodyFromRequest } = require('../utils/request-utils');
const { sendJsonResponse } = require('../utils/response-utils');
const { registerUserIfValid } = require('../services/register-service');

async function registerUser(req, res) {
    const body = await getBodyFromRequest(req);
    const registeredUser = JSON.parse(body);
    const { statusCode, response } = await registerUserIfValid(registeredUser);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    registerUser
}