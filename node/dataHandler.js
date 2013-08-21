
var mongo = require('./mongo');
var solr = require('./solr');
var util = require('util');
var cache = require('memory-cache');
var fs = require('fs');

var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));
var articleObj = JSON.parse(fs.readFileSync('../conf/article.json', 'utf8'));
cache.put('context', context);



function parseObject(object, callback) {

	var context = cache.get('context');
	// console.log('pre results');
	mongo.queryMongo(context, 'schema', '', function(results) {
		// get all schemas
		// console.log('results' + results);
// 		for (schema in results) {
// 			//check each schema to see if the object passes the rule
// 			passesRule(object, schema['rule'], function(isType, contentObject) {
// 				if (isType) {
// 					for (field in schema['fields']) {
// 						findField(object, field, function(fieldContent) {
// 							contentObject[field] = fieldContent;
// 							// insertMongo(context, 'parsedData', contentObject);
// 						});
// 					}
// 				}
// 			});
// 		}
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

// parseObject({ });

exports.parseObject = parseObject;
console.log(util.inspect(articleObj));
