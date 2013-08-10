
var http = require('http');
var url = require('url');
var mongo = require('./mongo');
var util = require('util');

function route(handle, request, response) {
	
	console.log("Routing " + request.url);
	var pathname = url.parse(request.url).pathname;

	if (typeof handle[pathname] === 'function') {
		handle[pathname](request, response);
	} else {
		console.log("no request handle for " + pathname);
		response.write("404");
		response.end();
	}
}

exports.route = route;
