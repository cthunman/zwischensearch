
// work in progress

// Load dependencies
var http = require('http'),
	querystring = require('querystring'),
	JSONStream = require('JSONStream'),
	duplexer = require('duplexer'),
	request = require('request'),
	solr = require('solr-client');

// Create a client
// var client = function(options) {
// 	this.options = {
// 		host : options.host || '127.0.0.1',
// 		port : options.port || '8983',
// 		core : options.core || '',
// 		path : options.path || '/solr'
// 	};
// 	this.data = {};
// 	this.autoCommit = false;
// }

// Add a new document
// client.add({ id : 12, title_t : 'Hello' }, function(err, obj) {

// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('Solr response:' + obj);
// 	}
// });

var request = require('request');

request({uri:'http://localhost:8080/solr/select'}, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body);
	}
});