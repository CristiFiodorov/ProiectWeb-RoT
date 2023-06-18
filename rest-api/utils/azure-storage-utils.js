const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
require('dotenv').config();
fs = require('fs');

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_CONTAINER_NAME;


async function uploadFileToAzureBlobStorage(file) {
  try {
    const filePath = file.filepath;
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(file.originalFilename);

    await blockBlobClient.uploadFile(filePath, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype
        }
      });

    console.log("File uploaded successfully.");

    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}


module.exports = {
    uploadFileToAzureBlobStorage
}