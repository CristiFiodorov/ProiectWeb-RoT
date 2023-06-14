function sendJsonResponse(res, status, content) {
    res.writeHead(status, 'Content-Type', 'application/json');
    res.end(content);
}

function sendTextResponse(res, status, text) {
    res.writeHead(status, 'Content-Type', 'text/plain');
    res.end(text);
}

function sendFileResponse(res, status, file, contentType) {
    res.writeHead(status, 'Content-Type', contentType);
    res.end(file);
}

function sendEmptyResponse(res, status) {
    res.writeHead(status);
    res.end();
}

module.exports = {
    sendJsonResponse,
    sendFileResponse,
    sendTextResponse,
    sendEmptyResponse
}