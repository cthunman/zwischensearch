
var http = require('http');
var url = require('url');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var util = require('util');
var uuid = require('uuid');

function start(route) {

	var context = {};
	loadContext(context);

	function onRequest(request, response) {
		response.writeHead(200, {"Content-Type": "application/json"});
		var responseText = '';
		var requestObj = url.parse(request.url, true);
		var pathname = requestObj.pathname;
		var queryObj = requestObj.query;

		if (pathname === '/query') {
			queryMongo(context.mongodb, queryObj, function(results) {
				console.log(util.inspect(results));
				response.write(util.inspect(results));
				response.end();
			});

		} else if (pathname === '/insert') {
			insertMongo(context.mongodb, queryObj, function(results) {
				console.log(util.inspect(results));
				response.write(util.inspect(results));
				response.end();
			});
		} else {
			response.end();
		}
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

function loadContext(context) {
	var obj;
	fs.readFile('../conf/context.json', 'utf8', function (err, data) {
		if (err) {
			throw err;
		}
		console.log(data);
		obj = JSON.parse(data);

		context.mongodb = obj.mongodb;
		context.solr = obj.solr;
	});
}

function queryMongo(context, queryObj, callback) {

	var mongoAddress = 'mongodb://' + context + '/node';
	MongoClient.connect(mongoAddress, function(err, db) {

		if (err) {
		    throw err;
		}

		var collection = db.collection('test_insert');
		collection.find(queryObj).toArray(function(err, results) {
			// console.dir(results);
			callback(results);
			db.close();
		});
	});
}

function insertMongo(context, queryObj, callback) {

	var mongoAddress = 'mongodb://' + context + '/node';
	MongoClient.connect(mongoAddress, function(err, db) {

		if (err) {
		    throw err;
		}

		var id = uuid.v4();

		var collection = db.collection('test_insert');
	    collection.insert(queryObj, function(err, docs) {

	        collection.count(function(err, count) {
	            console.log(format("count = %s", count));
	        });

	        // Locate all the entries using find

	        collection.find().toArray(function(err, results) {
	            console.dir(results);
	            // Let's close the db
	            db.close();
	        });
	    });
	});
}

exports.start = start;
