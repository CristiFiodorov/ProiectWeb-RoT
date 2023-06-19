const { findChaptersByCourseId, createChapter, updateChapterById, deleteChapterById, findChapterById, findPrevChapterByCourseId, findNextChapterByCourseId } = require('../services/chapter-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');


async function getAllChapters(req, res, params) {
    const { statusCode, response } = await findChaptersByCourseId(params.course_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getChapterById(req, res, params) {
    const { statusCode, response } = await findChapterById(params.chapter_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createChapterController(req, res, params) {
    const chapter = await getBodyFromRequest(req);
    const { statusCode, response } = await createChapter(JSON.parse(chapter));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateChapter(req, res, params) {
    const chapter = await getBodyFromRequest(req);
    const { statusCode, response } = await updateChapterById(params.chapter_id, JSON.parse(chapter));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteChapter(req, res, params) {
    const { statusCode, response } = await deleteChapterById(params.chapter_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getPrevChapterByCourseId(req, res, params) {
    const { statusCode, response } = await findPrevChapterByCourseId(params.chapter_id, params.course_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getNextChapterByCourseId(req, res, params) {
    const { statusCode, response } = await findNextChapterByCourseId(params.chapter_id, params.course_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    getAllChapters,
    getChapterById,
    createChapterController,
    updateChapter,
    deleteChapter,
    getPrevChapterByCourseId,
    getNextChapterByCourseId
};