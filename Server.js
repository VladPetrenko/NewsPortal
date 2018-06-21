'use strict';

const http = require('http'),
      Router = require('./router'),
      port = 8000,
      server = http.createServer(Router);

let serverMsg = () => console.log(`работает, port: ${port}`);

server.listen(port, serverMsg);