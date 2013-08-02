
var http = require("http");
var url = require("url");

function start(route) {

	function onRequest(request, response) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		var responseText = '';
		var pathname = url.parse(request.url).pathname;

		if (pathname === "/solr") {

			var options = {
				host: 'localhost',
				port: 8080,
				path: '/solr/select',
				method: 'GET'
			};

			var req = http.request(options, function(res) {
					res.setEncoding('utf8');
			  		console.log("Got response: " + res.statusCode);
				res.on('error', function(e) {
					// doing nothing
		  		});
	  			res.on('data', function(chunk) {
					responseText += chunk;
				});
				res.on('end', function() {
					response.write(responseText);
					console.log(responseText);
					response.end();
				});
			});

			req.end();

		} else {
			response.write("boring");
			response.end();
		}
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
