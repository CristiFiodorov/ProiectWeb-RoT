const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const { uploadFileToAzureBlobStorage } = require("../utils/azure-storage-utils");
const fs = require('fs');

async function uploadFile(file) {
    try {
        const fileUrl = await uploadFileToAzureBlobStorage(file);

        fs.unlink(file.path, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('File deleted successfully');
            }
        });

        return new Status(200, new Response(true, fileUrl, "Image uploaded successfully."));
    } catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

module.exports = {
    uploadFile
}