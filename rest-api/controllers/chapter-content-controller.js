const { findChapterContentByChapterId, deleteChapterContentById } = require('../services/chapter-content-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');


async function getChapterContentByChapterId(req, res, params) {
    const {statusCode, response} = await findChapterContentByChapterId(params.chapter_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteChapterContent(req, res, params) {
    const {statusCode, response} = await deleteChapterContentById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    getChapterContentByChapterId,
    deleteChapterContent
};
