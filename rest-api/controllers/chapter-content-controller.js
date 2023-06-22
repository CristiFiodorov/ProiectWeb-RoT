const { findChapterContentByChapterId, addToChapterContent, clearChapterContent, deleteChapterContentById, findChapterContentByChapterIdInCSV, updateChapterContent } = require('../services/chapter-content-service');
const { sendJsonResponse, sendCSVResponse, sendJsonResponseWithDownload } = require('../utils/response-utils');
const { uploadFile } = require('../services/file-upload-service');
const formidable = require('formidable');
const { getBodyFromRequest } = require('../utils/request-utils');


async function getChapterContentByChapterId(req, res, params) {
    const {statusCode, response} = await findChapterContentByChapterId(params.chapter_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function addToChapterContentController(req, res, params) {
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
            let statusCode;
            let response;
    
            if (uploadedFile && fields.elementType === 'image') {
                const status = await uploadFile(uploadedFile);
                response = status.response;
                statusCode = status.statusCode;
          
                if(statusCode !== 200){
                    sendJsonResponse(res, statusCode, JSON.stringify(response));
                    return;
                }
            }
            else{
                response = {data: fields.data};
                statusCode = 200;
            }

            const content = {
                elementType: fields.elementType,
                data: response.data,
                tags: fields.tags
            }

            const { statusCode: statusCode2, response: response2 } = await addToChapterContent(params.chapter_id, content);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function clearChapterContentController(req, res, params) {
    const {statusCode, response} = await clearChapterContent(params.chapter_id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteChapterContent(req, res, params) {
    const {statusCode, response} = await deleteChapterContentById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getChapterContentByChapterIdInCSV(req, res, params) {
    const {statusCode, response} = await findChapterContentByChapterIdInCSV(params.chapter_id);
    sendCSVResponse(res, statusCode, response.data);
}

async function getChapterContentByChapterIdInJSON(req, res, params) {
    const {statusCode, response} = await findChapterContentByChapterId(params.chapter_id);
    content = response.data.content.map(element => {
        return { elementType: element.elementType, data: element.data, tags: element.tags }
    });

    sendJsonResponseWithDownload(res, statusCode, JSON.stringify(content), 'chapter-content.json');
}

async function updateChapterContentController(req, res, params) {
    const body = await getBodyFromRequest(req);
    const {statusCode, response} = await updateChapterContent(params.chapter_id, JSON.parse(body));
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {
    getChapterContentByChapterId,
    addToChapterContentController,
    clearChapterContentController,
    deleteChapterContent,
    getChapterContentByChapterIdInCSV,
    getChapterContentByChapterIdInJSON,
    updateChapterContentController
};
