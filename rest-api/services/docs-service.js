const fs = require('fs');

const {sendFileResponse} = require('../utils/response-utils');

function getDocFileAndContentType(req, res) {
    const extension = req.url.split('.').pop();
    let contentType = 'text/html';
    switch (extension) {
        case 'css': contentType = 'text/css'; break;
        case 'js': contentType = 'application/javascript'; break;
        case 'json': contentType = 'application/json'; break;
        case 'yml': contentType = 'application/x-yaml'; break;
    }
    
    return [req.url.substr(1), contentType];
}

function serveDocFile(req, res) {
    try {
        const [filePath, contentType] = getDocFileAndContentType(req, res);
        const file = fs.readFileSync(filePath, 'utf8');
        sendFileResponse(res, 200, file, contentType);
        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    }
}

module.exports = {
    getDocFileAndContentType,
    serveDocFile
}