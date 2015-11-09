/// <reference path="../typings/tsd.d.ts" />
import Hapi = require('hapi');
import routes = require('./routes');

let server = new Hapi.Server();
server.connection({ port: 3000 });

server.route(<Hapi.IRouteConfiguration[]>routes);

server.start(() => {
  console.log(`Server running at ${server.info.uri}`);
});

module.exports = server;
