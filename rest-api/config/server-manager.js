const { Server } = require('http');
const { sendTextResponse } = require('../utils/response-utils');
const { serveDocFile } = require('../services/docs-service');
const { sendEmptyResponse } = require('../utils/response-utils');
const url = require('url');

class ServerManager extends Server {
    routes = new Map();

    constructor() {
        super();
        this.on('request', this.handleRequest);
    }

    get(route, handler) {
        this.registerRoute('GET', route, handler);
    }

    post(route, handler) {
        this.registerRoute('POST', route, handler);
    }

    put(route, handler) {
        this.registerRoute('PUT', route, handler);
    }

    delete(route, handler) {
        this.registerRoute('DELETE', route, handler);
    }

    registerRoute(method, route, handler) {
        if (!this.routes.has(method)) {
            this.routes.set(method, new Map());
        }
        this.routes.get(method).set(route, handler);
    }

    handleRequest(req, res) {
        const { pathname, query } = url.parse(req.url, true);
        const method = req.method.toUpperCase();
    
        // CORS Stuff
        if (method === 'OPTIONS') {
            sendEmptyResponse(res, 204);
            return;
        }
    
        const handlers = this.routes.get(method);
        if (!handlers) {
            sendTextResponse(res, 404, `Route ${pathname} not found`);
            return;
        }
    
        let handler = handlers.get(pathname);
        if (!handler) {
            // if the request is a GET request and the requested url is a local file for swagger
            if (serveDocFile(req, res)) {
                return;
            }
            sendTextResponse(res, 404, `Route ${pathname} not found`);
            return;
        }
    
        // Pass the query object as a second argument to the handler function
        handler(req, res, query);
    }
}

module.exports = ServerManager;