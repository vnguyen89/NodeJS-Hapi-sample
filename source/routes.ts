/// <reference path="../typings/tsd.d.ts" />
import Hapi = require('hapi');

// class RouteConfiguration implements Hapi.IRouteConfiguration {
// 	public path: string;
// 	public method: string | string[];
// 	public handler: Hapi.ISessionHandler | string | Hapi.IRouteHandlerConfig;
// 	public config: Hapi.IRouteAdditionalConfigurationOptions;

// };

var routes: Hapi.IRouteConfiguration[] = [];
routes.push({
	method: 'GET',
	path: '/{name}',
	handler(request: Hapi.Request, reply: Hapi.IReply) {
		reply(`Hello, ${encodeURIComponent(request.params['name']) }`);
	}
});

routes.push({
	method: 'GET',
	path: '/',
	handler(request: Hapi.Request, reply: Hapi.IReply) {
		reply('Hello, world!');
	}
});
 

module.exports = routes;