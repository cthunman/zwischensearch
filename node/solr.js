
var solrClient = require('solr-client');
var mongo = require('./mongo');
var uuid = require('uuid');

// createClient(host, port, core, path)
var client = solrClient.createClient('127.0.0.1', 8080, '', '/solr');
client.autoCommit = true;

var date = new Date();

// Add a new document
var obj = { };
obj["id"] = uuid.v4();
obj["_p1_dynamic"] = uuid.v4();
obj["date"] = date.getMilliseconds();

client.add(obj, function(err, obj) {
	if (err) {
		console.log(err);
	} else {
		console.log('Solr response:' + obj);
	}
});
