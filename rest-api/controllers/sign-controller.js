const { findSignsByCategory, findSignById, findNextSignsByCategory, findPrevSignsByCategory, createSign, deleteSignById, updateSignById } = require('../services/sign-service');
const { sendJsonResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');
const { uploadFile } = require('../services/file-upload-service');
const formidable = require('formidable');

async function getSignsByCategory(req, res, params) {
    const { statusCode, response } = await findSignsByCategory(params.category_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getSignById(req, res, params) {
    const { statusCode, response } = await findSignById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getNextSignByCategory(req, res, params) {
    const { statusCode, response } = await findNextSignsByCategory(params.sign_id, params.category_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getPrevSignByCategory(req, res, params) {
    const { statusCode, response } = await findPrevSignsByCategory(params.sign_id, params.category_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createSignController(req, res, params) {
    try {
        const form = new formidable.IncomingForm({  uploadDir: './uploads' });
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                sendJsonResponse(res, 400, JSON.stringify({
                success: false,
                data: null,
                message: 'Error uploading file'
                }));
            }
    
            const uploadedFile = files.file;
    
            if (!uploadedFile) {
                sendJsonResponse(res, 400, JSON.stringify({
                success: false,
                data: null,
                message: 'No file uploaded'
                }));
            }
    
            const { statusCode, response } = await uploadFile(uploadedFile);
          
            if(statusCode !== 200){
                sendJsonResponse(res, statusCode, JSON.stringify(response));
                return;
            }

            const sign = {
                title: fields.title,
                description: fields.description,
                parentId: fields.parentId,
                image_url: response.data
            }

            const { statusCode: statusCode2, response: response2 } = await createSign(sign);
            console.log("Sign " + sign);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function deleteSignByIdController(req, res, params) {
    const { statusCode, response } = await deleteSignById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateSignByIdController(req, res, params) {
    const body = await getBodyFromRequest(req);
    const { statusCode, response } = await updateSignById(params.id, JSON.parse(body));
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