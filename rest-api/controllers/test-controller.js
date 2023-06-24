const { sendJsonResponse } = require('../utils/response-utils');
const { saveTest, getTests, getTestById, getTestByIndex, updateTest, _deleteTest } = require('../services/test-service');

async function createTest(req, res, params) {
    const { statusCode, response } = await saveTest(req);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function findAllTests(req, res, params) {
    const { statusCode, response } = await getTests();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function findTestById(req, res, params) {
    const { statusCode, response } = await getTestById(params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function findTestByIndex(req, res, params) {
    const { statusCode, response } = await getTestByIndex(params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteTest(req, res, params) {
    const { statusCode, response } = await _deleteTest(params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function patchTest(req, res, params) {
    const { statusCode, response } = await updateTest(req, params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}
module.exports = {
    createTest,
    findAllTests,
    findTestById,
    findTestByIndex,
    patchTest,
    deleteTest
}