
var solrClient = require('solr-client');
var mongo = require('./mongo');
var uuid = require('uuid');

// createClient(host, port, core, path)
var client = solrClient.createClient('127.0.0.1', 8080, '', '/solr');
client.autoCommit = true;

// Add a new document
var obj = { };
obj["id"] = uuid.v4();

client.add(obj, function(err, obj) {
	if (err) {
		console.log(err);
	} else {
		console.log('Solr response:' + obj);
	}
});
