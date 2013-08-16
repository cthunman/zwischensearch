
var mongo = require('./mongo');
var solr = require('./solr');
var cache = require('memory-cache');

function saveObject(object, callback) {

	var context = cache.get('context');
	queryMongo(context, 'schema', '', function(results) {
		for (schema in results) {
			passesRule(object, schema['rule'], function(isType) {
				if (isType) {
					for (field in schema['fields']) {
						findField(object, field, function(fieldContent) {
							insertMongo(context, 'parsedData', obj);
						});
					}
				}
			});
		}
	});
}

function passesRule(object, rule, callback) {

	var isType = true;
	callback(isType);
}

function findField(object, field, callback) {

	// find the field in the text
	var fieldContent = 'textfromfield';
	callback(fieldContent);
}
