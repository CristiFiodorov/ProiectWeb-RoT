const { findSignsByCategoryId, findSignById, findNextSignsByCategory, findPrevSignsByCategory, createSign, deleteSignById, updateSignById, findAllSigns, findSignsByCategoryIdInCSV } = require('../services/sign-service');
const { sendJsonResponse, sendCSVResponse } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');
const { uploadFile } = require('../services/file-upload-service');
const formidable = require('formidable');

async function getSignsByCategoryId(req, res, params) {
    const { statusCode, response } = await findSignsByCategoryId(params.category_id);
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

            const sign = {
                title: fields.title,
                description: fields.description,
                parentId: fields.parentId,
                image_url: response.data
            }

            const { statusCode: statusCode2, response: response2 } = await createSign(sign);

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
                const { statusCode: statusCode2, response: response2 } = await findSignById(params.id);
                response = { data: response2.data.image_url};
            }

            const sign = {
                title: fields.title,
                description: fields.description,
                parentId: fields.parentId,
                image_url: response.data
            }

            const { statusCode: statusCode2, response: response2 } = await updateSignById(params.id, sign);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function getAllSigns(req, res, params) {
    const { statusCode, response } = await findAllSigns();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getSignsByCategoryIdInCSV(req, res, params) {
    const { statusCode, response } = await findSignsByCategoryIdInCSV(params.category_id);
    sendCSVResponse(res, statusCode, response.data);
}

async function getSignsByCategoryIdInJSON(req, res, params) {
    const { statusCode, response } = await findSignsByCategoryId(params.category_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response.data));
}

module.exports = {
    getSignsByCategoryId,
    getSignById,
    getNextSignByCategory,
    getPrevSignByCategory,
    createSignController,
    deleteSignByIdController,
    updateSignByIdController,
    getAllSigns,
    getSignsByCategoryIdInCSV,
    getSignsByCategoryIdInJSON
};