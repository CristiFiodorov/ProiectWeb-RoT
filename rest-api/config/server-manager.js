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

        const handlers = this.routes.get(method);

        let foundRoute = false;
        handlers.forEach((handler, route) => {
            const params = matchRoute(route, reqUrl);
            if (params) {
                foundRoute = true;
                console.log(params);
                handler(req, res, params);
            }
        });

        if (!foundRoute) {
            // if the request is a GET request and the requested url is a local file for swagger
            if (servedDocFile(req, res)) {
                return;
            }
            sendTextResponse(res, 404, `Route ${reqUrl} not found`);
            return;
        }

        // handlers.get(reqUrl)(req, res);
    }
}

function matchRoute(route, reqUrl) {
    const routeParts = route.split('/');
    const urlParts = reqUrl.split('/');

    if (routeParts.length !== urlParts.length) {
        return null;
    }

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
        const routePart = routeParts[i];
        const urlPart = urlParts[i];

        if (routePart.startsWith(':')) {
            const paramName = routePart.slice(1);
            params[paramName] = urlPart;
        } else if (routePart !== urlPart) {
            return null;
        }
    }

    return params;
}

module.exports = {ServerManager, matchRoute};