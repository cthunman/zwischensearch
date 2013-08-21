
var mongo = require('./mongo');
var solr = require('./solr');
var util = require('util');
var cache = require('memory-cache');
var fs = require('fs');

var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));
var articleObj = JSON.parse(fs.readFileSync('../conf/article.json', 'utf8'));
cache.put('context', context);

// mongo.insertMongo(context, 'schema', articleObj, function(results) {
// 	console.log(util.inspect(results));
// });

function parseObject(object, callback) {

	var context = cache.get('context');
	// console.log('pre results');
	mongo.queryMongo(context, 'schema', '', function(results) {
		// get all schemas
		function checkRuleLoop(i) {
			if (i < results.length) {
				var schema = results[i];
				// console.log('\ncurrent schema\n' + util.inspect(schema));
				checkRule(object, schema['rule'], function(isType) {
					if (isType) {
						var contentObject = { };
						function findFieldLoop(j) {
							// console.log('\ncurrent schema.fields\t' + util.inspect(schema['fields']) + '\n');
							if (schema['fields'] !== undefined && j < schema['fields'].length) {
								var field = schema['fields'][j];
								var fieldName = field['name'];
								contentObject[fieldName] = findField(object, field);
								findFieldLoop(j + 1);
							} else {
								callback(contentObject);
							}
	 					} findFieldLoop(0);
					}
				});
				checkRuleLoop(i + 1);
			}
		} checkRuleLoop(0);
	});
}

function checkRule(object, rule, callback) {

	var isType = true;
	callback(isType);
}

function findField(object, field) {

	// find the field in the text
	var fieldContent = 'textfromfield';
	// console.log('fieldContent ' + fieldContent);
	return fieldContent;
}

parseObject({ }, function(contentObject) {
	if (contentObject !== undefined) {
		console.log('content object ' + util.inspect(contentObject));
	} else {
		// console.log('content object is undefined, try again\n');
	}
});

exports.parseObject = parseObject;
