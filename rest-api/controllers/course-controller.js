const { findAllCourses, createCourse, deleteCourseById, updateCourseById } = require('../services/course-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');


async function getAllCourses(req, res) {
    const {statusCode, response} = await findAllCourses();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createCourseController(req, res) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await createCourse(JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteCourse(req, res, params) {
    const {statusCode, response} = await deleteCourseById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateCourse(req, res, params) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await updateCourseById(params.id, JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    getAllCourses,
    createCourseController,
    deleteCourse,
    updateCourse
};