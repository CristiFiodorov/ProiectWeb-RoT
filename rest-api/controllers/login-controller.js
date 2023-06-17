const { getBodyFromRequest } = require('../utils/request-utils');
const { sendJsonResponse } = require('../utils/response-utils');
const { loginUserIfValid } = require('../services/login-service');

async function loginUser(req, res) {
    const body = await getBodyFromRequest(req);
    const loginCreds = JSON.parse(body);
    const { statusCode, response } = await loginUserIfValid(loginCreds);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    loginUser
}