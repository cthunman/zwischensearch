
var dataHandler = require('./dataHandler');
var mongo = require('./mongo');
// var solr = require('./solr');
var solrHandler = require('./solrHandler');
var util = require('util');
var cache = require('memory-cache');
var fs = require('fs');
var jsdom = require('jsdom');
var Crawler = require("crawler").Crawler;

var context = JSON.parse(fs.readFileSync('../conf/context.json', 'utf8'));
var sites = context.crawl;
console.log(sites);

var crawler = new Crawler({
	"maxConnections":10,

	// This will be called for each crawled page
	"callback":function(error, result, $) {
		// console.log('callback' + util.inspect(result));
		if (error) {
			console.log('error');
		}

	    // $ is a jQuery instance scoped to the server-side DOM of the page
	    $("a").each(function (index, a) {
	        crawler.queue(a.href);
	        if (a.href.search('buzzfeed.com') != -1 && a.href.search('http://') != -1) {
	        	console.log('a.href ' + a.href);
	        }
	    });
	}
});

// Queue just one URL, with default callback
crawler.queue("http://www.buzzfeed.com");
// crawler.queue("http://www.gawker.com");
console.log('here');

function onSiteList(href, callback) {

	// iterate through sites and if href matches, callback(href)
	
}
