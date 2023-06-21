const { findSignCategories, findSignCategoryById, createSignCategory, deleteSignCategoryById, updateSignCategoryById, findSignCategoriesInCSV } = require('../services/signcategories-service');
const { sendJsonResponse, sendCSVResponse, sendJsonResponseWithDownload } = require('../utils/response-utils');
const { getBodyFromRequest } = require('../utils/request-utils');
const { uploadFile } = require('../services/file-upload-service');
const formidable = require('formidable');

async function getSignCategories(req, res) {
    const { statusCode, response } = await findSignCategories();
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function getSignCategoryById(req, res, params) {
    const { statusCode, response } = await findSignCategoryById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function createSignCategoryController(req, res) {
    try {
        console.log("Am ajuns totusi");
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

            const uploadedFile = files.file;
            console.log(uploadedFile);
            if (!uploadedFile) {
                sendJsonResponse(res, 400, JSON.stringify({
                    success: false,
                    data: null,
                    message: 'No file uploaded'
                }));
                return;
            }

            const { statusCode, response } = await uploadFile(uploadedFile);

            if (statusCode !== 200) {
                sendJsonResponse(res, statusCode, JSON.stringify(response));
                return;
            }

            const signCategory = {
                title: fields.title,
                image_url: response.data
            }

            const { statusCode: statusCode2, response: response2 } = await createSignCategory(signCategory);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function deleteSignCategoryByIdController(req, res, params) {
    const { statusCode, response } = await deleteSignCategoryById(params.id);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

async function updateSignCategoryByIdController(req, res, params) {
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

            const uploadedFile = files.file;

            let response = null;
            let statusCode;

            if (uploadedFile) {
                const status = await uploadFile(uploadedFile);
                response = status.response;
                statusCode = status.statusCode;

                if (statusCode !== 200) {
                    sendJsonResponse(res, statusCode, JSON.stringify(response));
                    return;
                }
            }

            if (!response) {
                const { statusCode: statusCode2, response: response2 } = await findSignCategoryById(params.id);
                response = { data: response2.data.image_url};
            }

            const signCategory = {
                title: fields.title,
                image_url: response.data
            }

            const { statusCode: statusCode2, response: response2 } = await updateSignCategoryById(params.id, signCategory);

            sendJsonResponse(res, statusCode2, JSON.stringify(response2));
        });
    } catch (error) {
        console.error(error);
        sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function getSignCategoriesInCSV(req, res) {
    const { statusCode, response } = await findSignCategoriesInCSV();
    sendCSVResponse(res, statusCode, response.data);
}

async function getSignCategoriesInJSON(req, res) {
    const { statusCode, response } = await findSignCategories();
    sendJsonResponseWithDownload(res, statusCode, JSON.stringify(response.data));
}


module.exports = {
    getSignCategories,
    getSignCategoryById,
    createSignCategoryController,
    deleteSignCategoryByIdController,
    updateSignCategoryByIdController,
    getSignCategoriesInCSV,
    getSignCategoriesInJSON
};