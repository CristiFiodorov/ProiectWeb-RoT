function getBodyFromRequest(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(JSON.stringify({ message: error.message }));
        }
    });
}

module.exports = {
    getBodyFromRequest
}
