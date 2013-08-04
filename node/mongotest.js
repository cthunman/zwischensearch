
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var uuid = require('uuid');

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {

    if (err) {
        throw err;
    }

    var collection = db.collection('test_insert');

    var id = uuid.v4();
    
    for (i = 100; i < 120; i++) {

        var obj = { };
        obj[i] = "sample" + "." + i/2;
        obj["_id"] = uuid.v4();
    
        collection.insert(obj, function(err, docs) {

            collection.count(function(err, count) {
                console.log(format("count = %s", count));
            });

            // Locate all the entries using find

            collection.find().toArray(function(err, results) {
                console.dir(results);
                // Let's close the db
                db.close();
            });
        });
    }
});

