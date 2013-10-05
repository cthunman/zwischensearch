
var solrClient = require('solr-client');
var mongo = require('./mongo');
// var solr = require('./solr');
var util = require('util');
var cache = require('memory-cache');
var fs = require('fs');
var jsdom = require('jsdom');
var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));

cache.put('context', context);

function parseMongoObject(object, callback) {

	var context = cache.get('context');

	var solrObject = { };
	solrObject['schemaId'] = object['schemaId'];
	solrObject['all'] = object['all'];
	solrObject['id'] = object['id'];

	var schemaQuery = { };
	schemaQuery['_id'] = object['schemaId'];
	mongo.query(context, context.mongo.schema_collection, schemaQuery, function(schemaResults) {
		if (schemaResults.length > 0) {
			var schema = schemaResults[0];
			var schemaFields = schema['fields'];

			function fieldsLoop(i) {
				if (i < schemaFields.length) {
					var currentField = schemaFields[i];
					var boostFactor = currentField['boostFactor'];
					var fieldName = currentField['name'];

					var solrField = '_p' + boostFactor + '_' + schema['name'] + '_' + fieldName;
					solrObject[solrField] = object[fieldName];
					fieldsLoop(i + 1);
				} else {
					callback(solrObject);
				}
			} fieldsLoop(0);
		}
	});
}

function addObject(object, callback) {

	var context = cache.get('context');	
	var client = solrClient.createClient(context.solr.domain, context.solr.port, '', context.solr.path);
	client.autoCommit = true;

	client.add(object, function(err, object) {
		if (err) {
			console.log('Solr error response:' + util.inspect(err));
		} else {
			console.log('Solr response:' + util.inspect(object));
		}
	});

	callback();
}

exports.parseMongoObject = parseMongoObject;
exports.addObject = addObject;
