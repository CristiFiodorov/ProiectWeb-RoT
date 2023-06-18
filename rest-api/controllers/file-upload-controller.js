const { uploadFile } = require('../services/file-upload-service');
const { sendJsonResponse } = require('../utils/response-utils');
const formidable = require('formidable');

async function uploadFileController(req, res) {
  try {
    const form = new formidable.IncomingForm({  uploadDir: './uploads', multiples: false });

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
      sendJsonResponse(res, statusCode, JSON.stringify(response));
    });
  } catch (error) {
    console.error(error);
    sendJsonResponse(res, 500, JSON.stringify({ error: 'Internal Server Error' }));
  }
}

module.exports = {
  uploadFileController
};
