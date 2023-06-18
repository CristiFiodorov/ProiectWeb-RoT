const fs = require('fs');
const { uploadFile } = require('../services/file-upload-service');
const { sendJsonResponse } = require('../utils/response-utils');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage: storage });

async function uploadFileController(req, res) {
  try {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        sendJsonResponse(res, 400, JSON.stringify({
          success: false,
          data: null,
          message: 'Error uploading file'
        }));
      }

      const uploadedFile = req.file;

      if (!uploadedFile) {
        sendJsonResponse(res, 400, JSON.stringify({
          success: false,
          data: null,
          message: 'No file uploaded'
        }));
      }

      const { statusCode, response } = await uploadFile(uploadedFile);
      console.log(response);
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
