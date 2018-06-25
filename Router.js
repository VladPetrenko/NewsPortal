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

    if (request.method === 'GET' && portalUrl[1] === 'user' && portalUrl.length < 5) {
        if (portalUrl.length === 3) {
            let user = ctrl.getUserById(portalUrl[2]);
            if (!user) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.end('This user ' + portalUrl[2] + ' does not exist');
            }
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(user));
        } else if (portalUrl[3] === 'export') {
            let exp = ctrl.export(portalUrl[2], response);

            
           // response.end('user export done');



        } else if (portalUrl[3] === 'subscription') {
            let subscription = ctrl.getSubscriptions(portalUrl[2]);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(subscription));
        } else {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end('This page does not exist');
        }

    } else if (request.method === 'GET' && portalUrl[1] === 'news' && portalUrl.length < 6) {
        if (portalUrl.length === 3) {
            let news = ctrl.getNewsById(portalUrl[2]);
            if (!news) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.end('This news ' + portalUrl[2] + ' does not exist');
            }
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(news));
        } else if (portalUrl[3] === 'subscribe') {
            ctrl.subscribe(portalUrl[4], portalUrl[2]);
            response.writeHead(200, 'OK');
            response.end();
        } else if (portalUrl[3] === 'unsubscribe') {
            ctrl.unsubscribe(portalUrl[4], portalUrl[2]);
            response.writeHead(200, 'OK');
            response.end();
        } else {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end('This page does not exist');
        }
    } else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end('This page does not exist');
    }
}

module.exports = router;