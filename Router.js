'use strict';

const url = require('url');
const fs = require('fs');
const User = require('./User');
const News = require('./News');
const Emitter = require('./Emitter');
const Controller = require('./Controller');

let ctrl = new Controller();

function router(request, response) {

    let portalUrl = request.url.split('/');

    if (request.method === 'GET' && portalUrl[1] === 'user') {
        if (portalUrl.length === 3) {
            let user = ctrl.getUserById(portalUrl[2]);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(user));
        } else if (portalUrl[3] === 'export') {


        } else if (portalUrl[3] === 'subscription') {
            let user = ctrl.getSubscriptions(portalUrl[2]);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(user));
        }

    } else if (request.method === 'GET' && portalUrl[1] === 'news') {
        if (portalUrl.length === 3) {
            let user = ctrl.getNewsById(portalUrl[2]);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(user));
        } else if (portalUrl[3] === 'subscribe') {
            ctrl.subscribe(portalUrl[4], portalUrl[2]);
            response.writeHead(200, 'OK');
            response.end();
        } else if (portalUrl[3] === 'unsubscribe') {
            ctrl.unsubscribe(portalUrl[4], portalUrl[2]);
            response.writeHead(200, 'OK');
            response.end();
        }
    } else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end('This page does not exist');
    }
}

module.exports = router;