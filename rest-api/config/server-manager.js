const { Server } = require('http');
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
            res.statusCode = 405;
            res.write(`Method ${method} not allowed`);
            res.end();
            return;
        }

        const handlers = this.routes.get(method);
        if (!handlers.has(reqUrl)) {
            res.statusCode = 404;
            res.write('Not found');
            res.end();
            return;
        }

        handlers.get(reqUrl)(req, res);
    }
}

module.exports = ServerManager;