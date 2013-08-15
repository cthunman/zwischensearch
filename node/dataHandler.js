
var mongo = require('./mongo');
var solr = require('./solr');
var cache = require('memory-cache');

function saveObject(object, callback) {

	var context = cache.get('context');
	queryMongo(context, 'schema', '', function() {
		for (result in results) {
			applyRule(object, result['rule'], function(isType) {
				if (isType) {
					// ?
					for (field in result['fields']) {
						findField(object, field, function(field) {

						});
					}
				}
			});
		}
	});
}

function applyRule(object, rule, callback) {

	var isType = true;
	callback(isType);
}

function findField(object, field, callback) {

	// find the field in the text
	var field = 'textfromfield';
	callback(field);
}
