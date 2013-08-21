
var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');
var cache = require('memory-cache');

function start(route, handle) {

	var context = loadContext();
	cache.put('context', context);
	console.log('context loaded with params: ' + util.inspect(context));

	function onRequest(request, response) {

		response.writeHead(200, {"Content-Type": "application/json"});
		route(handle, request, response);
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

function loadContext() {
	return JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));
}

exports.start = start;
