
var http = require("http");
var url = require("url");
var uuid = require("uuid");
var $ = require("jquery").create();
var fs = require('fs');

var article = fs.readFileSync('../conf/articleSample.html', 'utf8');

// // console.log(article);
// console.log($('.tags'));

console.log('article: ' + article);

var jsdom = require('jsdom').jsdom;
jsdom.env(
	article, ["http://code.jquery.com/jquery.js"],
	function (errors, window) {
		console.log("body contents", window.$("body").html());
	}
);

var myWindow = jsdom().createWindow(article);
var $ = require('jquery').create();
var jQuery = require('jquery').create(myWindow);

// $("<h1>test passes</h1>").appendTo("body");
console.log($("body").html());

// jQuery("<h3>second test passes</h3>").appendTo("body");
console.log(jQuery("body").html());

// var articleObj = JSON.parse(fs.readFileSync('../conf/article.json', 'utf8'));
// var blagObj = JSON.parse(fs.readFileSync('../conf/blogPost.json', 'utf8'));
// mongo.insert(context, 'schema', blagObj, function(results) {
// 	console.log(util.inspect(results));
// });
// mongo.insert(context, 'schema', articleObj, function(results) {
// 	console.log(util.inspect(results));
// });
// var article = fs.readFileSync('../conf/sampleblag.html', 'utf8');
// // var article = fs.readFileSync('../conf/sampleblag.html', 'utf8');
// parseObject(article, function(contentObject) {
// 	if (contentObject !== undefined) {
// 		console.log('content object ' + util.inspect(contentObject));
// 	} else {
// 		console.log('content object is undefined, try again\n');
// 	}
// });
