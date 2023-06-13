const { Server } = require('http');
const { sendTextResponse } = require('../utils/response-utils');
const { servedDocFile } = require('../services/docs-service');

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
        const reqUrl = url.parse(req.url).pathname;
        const method = req.method.toUpperCase();

        if (!this.routes.has(method)) {
            sendTextResponse(res, 405, `Method ${method} not allowed`);
            return;
        }

        const handlers = this.routes.get(method);
        if (!handlers.has(reqUrl)) {
            // if the request is a GET request and the requested url is a local file for swagger
            if (servedDocFile(req, res)) {
                return;
            }
            sendTextResponse(res, 404, `Route ${reqUrl} not found`);
            return;
        }

        handlers.get(reqUrl)(req, res);
    }
}

module.exports = ServerManager;