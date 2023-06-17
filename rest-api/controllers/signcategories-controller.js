const {findSignCategories, createSignCategory, deleteSignCategoryById, updateSignCategoryById} = require('../services/signcategories-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');

async function getSignCategories(req, res) {
    const {statusCode, response} = await findSignCategories();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createSignCategoryController(req, res) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await createSignCategory(JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteSignCategoryByIdController(req, res, params) {
    const {statusCode, response} = await deleteSignCategoryById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateSignCategoryByIdController(req, res, params) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await updateSignCategoryById(params.id, JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}


module.exports = {
    getSignCategories,
    createSignCategoryController,
    deleteSignCategoryByIdController,
    updateSignCategoryByIdController
};