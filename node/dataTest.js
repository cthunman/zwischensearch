
var dataHandler = require('./dataHandler');
var mongo = require('./mongo');
// var solr = require('./solr');
var solrHandler = require('./solrHandler');
var util = require('util');
var cache = require('memory-cache');
var fs = require('fs');
var jsdom = require('jsdom');
var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));

var articleObj = JSON.parse(fs.readFileSync('../conf/article.json', 'utf8'));
var blagObj = JSON.parse(fs.readFileSync('../conf/blogPost.json', 'utf8'));

// mongo.insert(context, context.mongo.schema_collection, blagObj, function(results) {
// 	console.log(util.inspect(results));
// });
// mongo.insert(context, context.mongo.schema_collection, articleObj, function(results) {
// 	console.log(util.inspect(results));
// });

var article = fs.readFileSync('../conf/articleSample.html', 'utf8');
// var article = fs.readFileSync('../conf/sampleblag.html', 'utf8');
dataHandler.parseObject(article, function(contentObject) {
	if (contentObject !== undefined) {
		solrHandler.parseMongoObject(contentObject, function(solrObject) {
			console.log(util.inspect(solrObject));
			console.log('done');

			solrHandler.addObject(solrObject, function() {
				console.log('started from the bottom now we here');
			});
		});
		// console.log('content object ' + util.inspect(contentObject));
	} else {
		console.log('content object is undefined, try again\n');
	}
});
