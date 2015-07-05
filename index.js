var mysql      = require('mysql');
var MongoClient = require('mongodb').MongoClient;

//logging
var assert = require('assert');
var winston = require('winston');

// connection to mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'glucoguide'
});

connection to mongodb
var url = 'mongodb://localhost:27017/glucoguide';

var inserIntoCollection = function(db, data, callback){
    var collection = db.collection('user');
    for(var i=0;i<data.length;i++){
      collection.insert([data[i]], function(err, result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);  
      });

    }
}

// var insertDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('user');
//   // Insert some documents
//   collection.insert([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the document collection");
//     callback(result);
//   });
// }

// MongoClient.connect(url, function(err, db) {
//   if(err){
//     console.log('MongoDB connection failed: ' + err);
//     return;
//   }
//   console.log("MongoDB connection  successful");
//   var collection = db.collection('user');
//
//   insertDocuments(db, function() {
//     db.close();
//   });
// });

connection.connect(function(err) {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
    return;
  }
  console.log('MySQL connection successful: ID-' + connection.threadId);
  connection.query('SELECT * FROM `user` ', function (error, results, fields) {
    if(err){
      console.error('error: ' + err.stack);
      return;
    }
    var data = [];
    var length = results.length;
    for(var i=0; i<length;i++){
      data.push(results[i])
    }
    console.log(data);
 });

});
