const { findAllAdvices, findAdviceById, createAdvice, updateAdviceById, deleteAdviceById, findNextAdvice, findPrevAdvice, findAllAdvicesInCSV } = require('../services/advice-service');
const { sendJsonResponse, sendCSVResponse, sendJsonResponseWithDownload } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');
const { uploadFile } = require('../services/file-upload-service');
const formidable = require('formidable');

async function getAdvices(req, res, params) {
    const {statusCode, response} = await findAllAdvices();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getAdviceById(req, res, params) {
    const {statusCode, response} = await findAdviceById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createAdviceController(req, res, params) {
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

            const advice = {
                title: fields.title,
                description: fields.description,
                image_url: response.data
            }

            const { statusCode: statusCode2, response: response2 } = await createAdvice(advice);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function deleteAdviceByIdController(req, res, params) {
    const {statusCode, response} = await deleteAdviceById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateAdviceByIdController(req, res, params) {
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
                const { statusCode: statusCode2, response: response2 } = await findAdviceById(params.id);
                response = { data: response2.data.image_url};
            }

            const advice = {
                title: fields.title,
                description: fields.description,
                image_url: response.data
            }

            const { statusCode: statusCode2, response: response2 } = await updateAdviceById(params.id, advice);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function getNextAdvice(req, res, params) {
    const {statusCode, response} = await findNextAdvice(params.advice_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getPrevAdvice(req, res, params) {
    const {statusCode, response} = await findPrevAdvice(params.advice_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getAdvicesInCSV(req, res, params) {
    const {statusCode, response} = await findAllAdvicesInCSV();
    sendCSVResponse(res, statusCode, response.data);
}

async function getAdvicesInJSON(req, res, params) {
    const {statusCode, response} = await findAllAdvices();
    sendJsonResponseWithDownload(res, statusCode, JSON.stringify(response.data));
}

module.exports = {
    getAdvices,
    getAdviceById,
    createAdviceController,
    deleteAdviceByIdController,
    updateAdviceByIdController,
    getNextAdvice,
    getPrevAdvice,
    getAdvicesInCSV,
    getAdvicesInJSON
};