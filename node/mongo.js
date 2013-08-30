
var MongoClient = require('mongodb').MongoClient;
var util = require('util');
var format = require('util').format;
var uuid = require('uuid');

function query(context, collectionName, queryObj, callback) {

	var mongoAddress = 'mongodb://' + context.mongodb + '/node';
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

function insert(context, collectionName, obj, callback) {

	var mongoAddress = 'mongodb://' + context.mongodb + '/node';
	MongoClient.connect(mongoAddress, function(err, db) {
		if (err) {
		    throw err;
		}
		var id = uuid.v4();
		obj['_id'] = id;
		var collection = db.collection(collectionName);
	    collection.insert(obj, function(err, docs) {
			if (err) {
			    throw err;
			}
			callback();
			db.close();
	    });
	});
}

exports.insert = insert;
exports.query = query;
