var util = require('util');
var async = require('async');

// async.series([
//     function(callbackFunc){
//         // do some stuff ...
//         callbackFunc(null, 'one');
//     },
//     function(callbackFunc){
//         // do some more stuff ...
//         callbackFunc(null, 'two');
//     }
// ],
// // optional callback
// function(err, results){
//     // results is now equal to ['one', 'two']
//     console.log(util.inspect(results));
// });


// Count all of the links from the Node.js build page
var jsdom = require("jsdom");

jsdom.env(
  "http://nodejs.org/dist/",
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    console.log("there have been", window.$("a").length, "nodejs releases!");
  }
);