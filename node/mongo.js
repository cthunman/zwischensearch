
var MongoClient = require('mongodb').MongoClient;
var util = require('util');
var format = require('util').format;
var uuid = require('uuid');

function queryMongo(context, collectionName, queryObj, callback) {

	var mongoAddress = 'mongodb://' + context + '/node';
	MongoClient.connect(mongoAddress, function(err, db) {

		if (err) {
		    throw err;
		}

		var collection = db.collection(collectionName);
		collection.find(queryObj).toArray(function(err, results) {
			callback(results);
			db.close();
		});
	});
}

function insertMongo(context, collectionName, obj, callback) {

	var mongoAddress = 'mongodb://' + context + '/node';
	MongoClient.connect(mongoAddress, function(err, db) {

		if (err) {
		    throw err;
		}
		var id = uuid.v4();

		var collection = db.collection(collectionName);
	    collection.insert(obj, function(err, docs) {

	        collection.count(function(err, count) {
	        });

	        collection.find().toArray(function(err, results) {
	            callback(results);
	            db.close();
	        });
	    });
	});
}

exports.insertMongo = insertMongo;
exports.queryMongo = queryMongo;
