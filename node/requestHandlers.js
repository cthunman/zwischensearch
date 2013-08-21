
var cache = require('memory-cache');
var url = require('url');
var util = require('util');
var mongo = require('./mongo');

function query (request, response) {
	var context = cache.get('context');
	var requestObj = url.parse(request.url, true);	
	var queryObj = requestObj.query;

	mongo.queryMongo(context, 'node', queryObj, function(results) {
		response.write(util.inspect(results));
		response.end();
	});
}

function insert (request, response) {
	var context = cache.get('context');
	var requestObj = url.parse(request.url, true);
	var queryObj = requestObj.query;

	mongo.insertMongo(context, 'node', queryObj, function(results) {
		response.write(util.inspect(results));
		response.end();
	});
}

function search (request, response) {
	console.log('request handler for search');
	response.write("search");
	response.end();
}

exports.query = query;
exports.insert = insert;
exports.search = search;
