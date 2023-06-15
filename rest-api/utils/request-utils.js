async function getBodyFromRequest(req) {
    return new Promise(async (resolve, reject) => {
        try {
            let body = '';
            await req.on('data', chunk => {
                body += chunk.toString();
            });

            await req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(JSON.stringify({ message: error.message }));
        }
    });
}


const destructureRequestMiddleware = async (req, res) => {
    res.locals = {
      ...res.locals,
      url: req.url,
      method: req.method
    };
  
    if (req.method === "GET" || req.method === "DELETE") {
      return { req, res, continue: true };
    }
  
    let body = '';
    await req.on('data', (chunk) => {
      body += chunk.toString();
    });
    await req.on('end', () => {
      body = body;
    });
  
    res.locals = {
      ...res.locals,
      body: JSON.parse(body)
    };
  
    return { req, res, continue: true };
  };

module.exports = {
    destructureRequestMiddleware,
    getBodyFromRequest
}
