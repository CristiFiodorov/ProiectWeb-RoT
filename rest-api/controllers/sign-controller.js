const {findSignsByCategory, findSignById, findNextSignsByCategory, findPrevSignsByCategory, createSign, deleteSignById, updateSignById} = require('../services/sign-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');

async function getSignsByCategory(req, res, params) {
    const {statusCode, response} = await findSignsByCategory(params.category_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getSignById(req, res, params) {
    const {statusCode, response} = await findSignById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getNextSignByCategory(req, res, params) {
    const {statusCode, response} = await findNextSignsByCategory(params.sign_id, params.category_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getPrevSignByCategory(req, res, params) {
    const {statusCode, response} = await findPrevSignsByCategory(params.sign_id, params.category_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createSignController(req, res, params) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await createSign(JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteSignByIdController(req, res, params) {
    const {statusCode, response} = await deleteSignById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateSignByIdController(req, res, params) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await updateSignById(params.id, JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}


module.exports = {
    getSignsByCategory, 
    getSignById, 
    getNextSignByCategory, 
    getPrevSignByCategory, 
    createSignController, 
    deleteSignByIdController, 
    updateSignByIdController
};