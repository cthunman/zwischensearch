
var mongo = require('./mongo');
var MongoClient = require('mongodb').MongoClient;
var cache = require('memory-cache');
var fs = require('fs');

var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));
var sites = context.crawl;

function addToQueue(href, callback) {
	isOnSiteList(href, function(onList) {
		if (onList) {
			var obj = { };
			obj['href'] = href;
			mongo.query(context, context.mongo.queue_collection, obj, function(results) {
				if (results.length == 0) {
					obj['weight'] = 1;
					mongo.insert(context, context.mongo.queue_collection, obj, function() {
						console.log('Inserted ' + href + ' into queue_collection.');
					});
				} else {
					incrementWeight(context, context.mongo.queue_collection, obj, function() {
						console.log('Incremented weight of ' + href + '.');
					});
				}
			});
		}
	});
}

function isOnSiteList(href, callback) {
	function checkSiteLoop(i, isOnList) {
		if (i < sites.length && !isOnList) {
			var currentSite = sites[i];
			checkSite(href, currentSite, function(passesTest) {
				if (passesTest) {
					callback(true);
				} else {
					checkSiteLoop(i + 1, isOnList);
				}
			});
		}
	} checkSiteLoop(0, false);
}

function checkSite(href, site, callback) {
	if (href.search(site) != -1) {
		callback(true);
	} else {
		callback(false);
	}
}

function incrementWeight(context, collectionName, obj, callback) {

	var mongoAddress = 'mongodb://' + context.mongo.address + '/' + context.mongo.db_name;
	MongoClient.connect(mongoAddress, function(err, db) {
		if (err) {
		    throw err;
		}
		var collection = db.collection(collectionName);
	    collection.update(obj, {$inc : { weight : +1 }}, function(err, docs) {
			if (err) {
			    throw err;
			}
			callback();
			db.close();
	    });
	});	
}

exports.addToQueue = addToQueue;
