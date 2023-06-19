const { findAllCourses, findCourseById, createCourse, deleteCourseById, updateCourseById } = require('../services/course-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');
const { uploadFile } = require('../services/file-upload-service');
const formidable = require('formidable');


async function getAllCourses(req, res) {
    const {statusCode, response} = await findAllCourses();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getCourseById(req, res, params) {
    const {statusCode, response} = await findCourseById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createCourseController(req, res) {
    try {
        const form = new formidable.IncomingForm({  uploadDir: './uploads' });
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                sendJsonResponse(res, 400, JSON.stringify({
                success: false,
                data: null,
                message: 'Error uploading file'
                }));
                return;
            }
    
            const uploadedFile = files.file;
    
            if (!uploadedFile) {
                sendJsonResponse(res, 400, JSON.stringify({
                success: false,
                data: null,
                message: 'No file uploaded'
                }));
                return;
            }
    
            const { statusCode, response } = await uploadFile(uploadedFile);
          
            if(statusCode !== 200){
                sendJsonResponse(res, statusCode, JSON.stringify(response));
                return;
            }

            const course = {
                title: fields.title,
                description: fields.description,
                image_url: response.data
            };

            const { statusCode: statusCode2, response: response2 } = await createCourse(course);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function deleteCourse(req, res, params) {
    const {statusCode, response} = await deleteCourseById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateCourse(req, res, params) {
    try {
        const form = new formidable.IncomingForm({  uploadDir: './uploads' });
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                sendJsonResponse(res, 400, JSON.stringify({
                success: false,
                data: null,
                message: 'Error uploading file'
                }));
                return;
            }
    
            const uploadedFile = files.file;

            let response = null;
            let statusCode;
    
            if (uploadedFile) {
                const status = await uploadFile(uploadedFile);
                response = status.response;
                statusCode = status.statusCode;
                
                if(statusCode !== 200){
                    sendJsonResponse(res, statusCode, JSON.stringify(response));
                    return;
                }
            }
            
            if(!response){
                const { statusCode: statusCode2, response: response2 } = await findCourseById(params.id);
                response = { data: response2.data.image_url};
            }

            const course = {
                title: fields.title,
                description: fields.description,
                image_url: response.data
            };
            
            const { statusCode: statusCode2, response: response2 } = await updateCourseById(params.id, course);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourseController,
    deleteCourse,
    updateCourse
};