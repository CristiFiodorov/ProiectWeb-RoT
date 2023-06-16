const { findChaptersByCourseId, deleteChapterById } = require('../services/chapter-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');


async function getAllChapters(req, res, params) {
    const {statusCode, response} = await findChaptersByCourseId(params.course_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteChapter(req, res, params) {
    const {statusCode, response} = await deleteChapterById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    getAllChapters,
    deleteChapter
};