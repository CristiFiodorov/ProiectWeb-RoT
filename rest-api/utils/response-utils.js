function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', 2592000);
}

function sendJsonResponse(res, status, content) {
    res.writeHead(status, {
        'Content-Type': 'application/json'
    });
    res.end(content);
}

function sendTextResponse(res, status, text) {
    setCorsHeaders(res);
    res.writeHead(status, 'Content-Type', 'text/plain');
    res.end(text);
}

function sendFileResponse(res, status, file, contentType) {
    setCorsHeaders(res);
    res.writeHead(status, 'Content-Type', contentType);
    res.end(file);
}

function sendEmptyResponse(res, status) {
    setCorsHeaders(res);
    res.writeHead(status);
    res.end();
}

module.exports = {
    sendJsonResponse,
    sendFileResponse,
    sendTextResponse,
    sendEmptyResponse
}