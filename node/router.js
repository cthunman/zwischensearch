
var http = require("http");
var url = require("url");

function route(request, response) {

	var responseText = '';
	var pathname = url.parse(request.url).pathname;

		if (pathname === "/solr") {
			responseText = '';

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
		  		});
	  			res.on('data', function(chunk) {
					responseText += chunk;
				});
				res.on('end', function() {
					// console.log(responseText);
				});
			});

			req.end();
			return responseText;
			// response.write(responseText);

		} else {

			return 'notthing';
			// response.write("boring");
		}
}

exports.route = route;
