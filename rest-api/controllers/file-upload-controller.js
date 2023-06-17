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
          console.error('Error uploading file:', err);
          res.statusCode = 500;
          res.end('Error uploading file');
          return;
        }

        const { name } = req.body;

        console.log('Name:', name);

        const uploadedFile = req.file;
        
        if (!uploadedFile) {
            console.error('No file uploaded.');
            res.statusCode = 400;
            res.end('No file uploaded.');
            return;
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
