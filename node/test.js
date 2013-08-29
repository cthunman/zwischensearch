
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
