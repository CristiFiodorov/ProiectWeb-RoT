const { findAllAdvices, findAdviceById, createAdvice, updateAdvice, deleteAdvice, findNextAdvice, findPrevAdvice } = require('../services/advice-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');


async function getAdvices(req, res, params) {
    const {statusCode, response} = await findAllAdvices();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getAdviceById(req, res, params) {
    const {statusCode, response} = await findAdviceById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createAdviceController(req, res, params) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await createAdvice(JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteAdviceByIdController(req, res, params) {
    const {statusCode, response} = await deleteAdvice(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateAdviceByIdController(req, res, params) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await updateAdvice(params.id, JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getNextAdvice(req, res, params) {
    const {statusCode, response} = await findNextAdvice(params.advice_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getPrevAdvice(req, res, params) {
    const {statusCode, response} = await findPrevAdvice(params.advice_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}


module.exports = {
    getAdvices,
    getAdviceById,
    createAdviceController,
    deleteAdviceByIdController,
    updateAdviceByIdController,
    getNextAdvice,
    getPrevAdvice
};