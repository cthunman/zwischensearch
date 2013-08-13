
var solrClient = require('solr-client');
var mongo = require('./mongo');
var util = require('util');
var uuid = require('uuid');

// createClient(host, port, core, path)
var client = solrClient.createClient('127.0.0.1', 8080, '', '/solr');
client.autoCommit = true;

var date = new Date();

// Add a new document
var obj = { };
obj["id"] = uuid.v4();
obj["all"] = "THIS IS TEXT " + uuid.v4();
var dynamicField = "_p1_" + uuid.v4();
obj[dynamicField] = "THIS IS DYNAMIC AS HELL " + uuid.v4();

console.log("obj " + util.inspect(obj));

client.add(obj, function(err, obj) {
	if (err) {
		console.log(err);
	} else {
		console.log('Solr response:' + util.inspect(obj));
	}
});
