
var mongo = require('./mongo');
var solr = require('./solr');
var util = require('util');
var cache = require('memory-cache');
var fs = require('fs');
var async = require('async');
var jsdom = require('jsdom');
var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));
var articleObj = JSON.parse(fs.readFileSync('../conf/article.json', 'utf8'));
cache.put('context', context);

// mongo.insert(context, 'schema', articleObj, function(results) {
// 	console.log(util.inspect(results));
// });

function parseObject(object, callback) {

	var context = cache.get('context');
	// get all schemas
	mongo.query(context, 'schema', '', function(schemaResults) {
		function checkRuleLoop(i) {
			if (i < schemaResults.length) {
				console.log('schemaResults.length: ' + schemaResults.length);
				var schema = schemaResults[i];
				// console.log('\ncurrent schema\n' + util.inspect(schema));
				checkRules(object, schema['rules'], function(isType) {
					// check what type of schema we're working with
					if (isType) {
						parseFields(object, schema, callback);
					}
				});
				checkRuleLoop(i + 1);
			}
		} checkRuleLoop(0);
	});
}

function parseFields(object, schema, callback) {
	var contentObject = { };
	function findFieldLoop(j, contentObject) {
		// console.log('loop: ' + j);
		// console.log('\ncurrent schema.fields\t' + util.inspect(schema['fields']) + '\n');
		if (schema['fields'] !== undefined && j < schema['fields'].length) {
			var field = schema['fields'][j];
			findField(object, field, contentObject, j + 1, findFieldLoop);
		} else {
			callback(contentObject);
		}
	} findFieldLoop(0, contentObject);	
}

function checkRules(object, rules, callback) {

	function ruleLoop(i, isType) {
		if (i < rules.length) {
			if (isType === true) {
				jsdom.env(util.inspect(object), ["http://code.jquery.com/jquery.js"], function (errors, window) {
					var check = rules[i]['findSelector'] + '' + rules[i]['testSelector'];
					var testLength = window.$(check).length;
					if (testLength > 0) {
						ruleLoop(i + 1, true);
					}
				});
			} else {
				ruleLoop(rules.length, false);
			}
		} else if (isType === true) {
			callback(true);
		} else {
			callback(false);
		}
	} ruleLoop(0, true);
}

function findField(object, field, contentObject, index, callback) {

	// find the field in the text
	var fieldName = field['name'];
	var fieldSelector = field['cssSelector']
	// console.log('fieldContent ' + fieldContent);

	jsdom.env(util.inspect(object), ["http://code.jquery.com/jquery.js"], function (errors, window) {
		var fieldContent = window.$(fieldSelector).text();
		contentObject[fieldName] = fieldContent;
		callback(index, contentObject);
	});
}

var article = fs.readFileSync('../conf/articleSample.html', 'utf8');
parseObject(article, function(contentObject) {
	if (contentObject !== undefined) {
		console.log('content object ' + util.inspect(contentObject));
	} else {
		console.log('content object is undefined, try again\n');
	}
});

exports.parseObject = parseObject;
