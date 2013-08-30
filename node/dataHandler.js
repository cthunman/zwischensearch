
var mongo = require('./mongo');
var solr = require('./solr');
var util = require('util');
var cache = require('memory-cache');
var fs = require('fs');
var jsdom = require('jsdom');
var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));

cache.put('context', context);

function parseObject(object, callback) {

	var context = cache.get('context');
	// get all schemas
	mongo.query(context, 'schema', '', function(schemaResults) {

		function checkRuleLoop(i, foundType) {
			if (i < schemaResults.length) {
				var schema = schemaResults[i];
				checkRules(object, schema['rules'], function(isType) {
					// check what type of schema we're working with
					if (isType) {
						foundType = true;
						parseFields(object, schema, callback);
					}
				});
				checkRuleLoop(i + 1, foundType);
			}
		} checkRuleLoop(0, false);
	});
}

function parseFields(object, schema, callback) {
	var contentObject = { };
	function findFieldLoop(j, contentObject) {
		if (schema['fields'] !== undefined && j < schema['fields'].length) {
			var field = schema['fields'][j];
			findField(object, field, contentObject, j + 1, findFieldLoop);
		} else {
			contentObject['all'] = util.inspect(object);
			contentObject['schemaId'] = schema['_id'];
			callback(contentObject);
		}
	} findFieldLoop(0, contentObject);
}

function findField(object, field, contentObject, index, callback) {

	// find the field in the text
	var fieldName = field['name'];
	var fieldSelector = field['cssSelector']

	jsdom.env(util.inspect(object), ["http://code.jquery.com/jquery.js"], function (errors, window) {
		var fieldContent = window.$(fieldSelector).text();
		contentObject[fieldName] = fieldContent;
		callback(index, contentObject);
	});
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

exports.parseObject = parseObject;
