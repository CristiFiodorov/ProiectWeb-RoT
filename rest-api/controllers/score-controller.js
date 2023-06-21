const { addScore } = require('../services/score-service');
const { sendJsonResponse } = require('../utils/response-utils');

async function addScoreToUser(req, res, params) {
    const { statusCode, response } = await addScore(req);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    addScoreToUser
}