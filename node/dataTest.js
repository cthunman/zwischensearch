
var dataHandler = require('./dataHandler');
var mongo = require('./mongo');
var solr = require('./solr');
var solrHandler = require('./solrHandler');
var util = require('util');
var cache = require('memory-cache');
var fs = require('fs');
var jsdom = require('jsdom');
var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));

var articleObj = JSON.parse(fs.readFileSync('../conf/article.json', 'utf8'));
var blagObj = JSON.parse(fs.readFileSync('../conf/blogPost.json', 'utf8'));

// mongo.insert(context, 'schema', blagObj, function(results) {
// 	console.log(util.inspect(results));
// });
// mongo.insert(context, 'schema', articleObj, function(results) {
// 	console.log(util.inspect(results));
// });

var article = fs.readFileSync('../conf/sampleblag.html', 'utf8');
// var article = fs.readFileSync('../conf/sampleblag.html', 'utf8');
dataHandler.parseObject(article, function(contentObject) {
	if (contentObject !== undefined) {
		solrHandler.parseMongoObject(contentObject, function() {
			console.log('done');
		});
		// console.log('content object ' + util.inspect(contentObject));
	} else {
		console.log('content object is undefined, try again\n');
	}
});
