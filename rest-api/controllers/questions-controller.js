const { getBodyFromRequest } = require('../utils/request-utils');
const { sendTextResponse, sendEmptyResponse, sendJsonResponse } = require('../utils/response-utils');
const { registerUserIfValid } = require('../services/register-service');
const { getQuestions, getQuestionById, saveQuestion } = require('../services/questions-service');
const { matchRoute } = require('../config/server-manager');

async function createQuestion(req,res,params){
    const {statusCode, response} = await saveQuestion(req);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function findAllQuestions(req, res, params) {
    const {statusCode, response} = await getQuestions();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function findQuestionById(req, res, params){
    const {statusCode, response} = await getQuestionById(params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    createQuestion,
    findAllQuestions,
    findQuestionById
}