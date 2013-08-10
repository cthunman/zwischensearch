
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/query"] = requestHandlers.query;
handle["/insert"] = requestHandlers.insert;
handle["/search"] = requestHandlers.search;

server.start(router.route, handle);
