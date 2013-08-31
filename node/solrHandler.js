
var mongo = require('./mongo');
var solr = require('./solr');
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

	var schemaQuery = { };
	schemaQuery['_id'] = object['schemaId'];
	// console.log('solr query: ' + util.inspect(schemaQuery));
	mongo.query(context, 'schema', schemaQuery, function(schemaResults) {
		// console.log('solr query: ' + util.inspect(schemaResults));
		if (schemaResults.length > 0) {
			var schema = schemaResults[0];
			var schemaFields = schema['fields'];
			// console.log('schema: ' + schema);
			// console.log('schemaFields: ' + schemaFields);

			function fieldsLoop(i) {
				if (i < schemaFields.length) {
					var currentField = schemaFields[i];
					var boostFactor = currentField['boostFactor'];
					var fieldName = currentField['name'];

					var solrField = '_p' + boostFactor + '_' + schema['name'] + '_' + fieldName;
					// console.log('solrField: ' + solrField);

					solrObject[solrField] = object[fieldName];

					console.log('solrObject: ' + util.inspect(solrObject));

					fieldsLoop(i + 1);
				}
			} fieldsLoop(0);
		}
	});

}

exports.parseMongoObject = parseMongoObject;
