
var http = require("http");
var url = require("url");
var uuid = require("node-uuid");

http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});

	var query = url.parse(request.url, true, true).query;
	// console.log(query);

	// console.log('keys ' + Object.keys(query));
	for (key in query) {
		console.log(key);
	}

	// response.write(pickOneString(function() {
	// 	setTimeout(function() {}, 10000);
	// 	if (test === 'even') {
	// 		console.log('power');
	// 	} else {
	// 		console.log('whatever');
	// 	}
	// }));

	response.write(uuid.v4());
	// response.write("Hello World");
	response.end();
}).listen(8888);
console.log("Server has started.");

function pickOne(callback) {
	var d = new Date();
	var n = d.getTime();
	var test;
	if (isEven(n)) {
		test = 'even';
	} else {
		test = 'odd';
	}
}

function pickOneString(callback) {
	var d = new Date();
	var n = d.getTime();

	if (isEven(n)) {
		return 'even';
	} else {
		return 'odd';
	}
}

function isEven(value) {
	if (value % 2 === 0) {
		return true;
	}
	else {
		return false;
	}
}

function queryDatabase(queryString, callback) {


}

// function(query, callback) {
//   myApi.exec('SomeCommand', function(response) {
//     // other stuff here...
//     // bla bla..
//     callback(response); // this will "return" your value to the original caller
//   });
// }

// not like this:
// var returnValue = myFunction(query);


// myFunction(query, function(returnValue) {
//   // use the return value here instead of like a regular (non-evented) return value
// });





