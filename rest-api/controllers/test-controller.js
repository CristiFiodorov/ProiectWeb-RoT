const { sendJsonResponse } = require('../utils/response-utils');
const { saveTest, getTests, getTestById, getTestByIndex } = require('../services/test-service');

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

async function findTestByIndex(req, res, params){
    const {statusCode, response} = await getTestByIndex(params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

// async function deleteQuestion(req, res, params){
//     const {statusCode, response} = await _deleteQuestion(params);
//     sendJsonResponse(res, statusCode, JSON.stringify(response));
// }

// async function patchQuestion(req, res, params){
//     const {statusCode, response} = await updateQuestion(req, params);
//     sendJsonResponse(res, statusCode, JSON.stringify(response));
// }
module.exports = {
    createTest,
    findAllTests,
    findTestById,
    findTestByIndex
    // deleteQuestion,
    // patchQuestion
}