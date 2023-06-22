const { addScore, addTestScore } = require('../services/score-service');
const { getUserTestScores } = require('../services/user-tests-service');
const { sendJsonResponse } = require('../utils/response-utils');

async function addScoreToUser(req, res, params) {
    const { statusCode, response } = await addScore(req);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}
async function addTestScoreToUser(req, res, params) {
    const { statusCode, response } = await addTestScore(req);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function userTestScores(req, res, params) {
    const { statusCode, response } = await getUserTestScores(req);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}
module.exports = {
    addScoreToUser,
    addTestScoreToUser,
    userTestScores
}