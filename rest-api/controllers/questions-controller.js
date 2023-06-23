const { getBodyFromRequest } = require('../utils/request-utils');
const { sendTextResponse, sendEmptyResponse, sendJsonResponse } = require('../utils/response-utils');
const { registerUserIfValid } = require('../services/register-service');
const { getQuestions, getQuestionById, saveQuestion, _deleteQuestion, updateQuestion, createUploadedQuestion } = require('../services/questions-service');
const { matchRoute } = require('../config/server-manager');
const { formidable } = require('formidable');
const { uploadFile } = require('../services/file-upload-service');

async function createQuestion(req, res, params) {
    const { statusCode, response } = await saveQuestion(req);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function findAllQuestions(req, res, params) {
    const { statusCode, response } = await getQuestions();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function findQuestionById(req, res, params) {
    const { statusCode, response } = await getQuestionById(params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function deleteQuestion(req, res, params) {
    const { statusCode, response } = await _deleteQuestion(params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function patchQuestion(req, res, params) {
    const { statusCode, response } = await updateQuestion(req, params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}


async function uploadQuestion(req, res, params) {
    try {
        const form = new formidable.IncomingForm({ uploadDir: './uploads' });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                sendJsonResponse(res, 400, JSON.stringify({
                    success: false,
                    data: null,
                    message: 'Error uploading file'
                }));
                return;
            }
            console.log(files);
            const uploadedFile = files.file;
            let image_url = null;
            if (uploadedFile) {
                const { statusCode, response } = await uploadFile(uploadedFile);

                if (statusCode !== 200) {
                    sendJsonResponse(res, statusCode, JSON.stringify(response));
                    return;
                }
                image_url = response.data;
            }



            const question = {
                question: fields.question,
                answers: fields.answers,
                image_url: image_url
            }

            const { statusCode: statusCode2, response: response2 } = await createUploadedQuestion(question);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}


module.exports = {
    uploadQuestion,
    createQuestion,
    findAllQuestions,
    findQuestionById,
    deleteQuestion,
    patchQuestion
}