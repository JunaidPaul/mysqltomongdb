var mysql      = require('mysql');
var MongoClient = require('mongodb').MongoClient;

//logging
var assert = require('assert');
var winston = require('winston');

//Global varaibales
var data = [];


// connection to mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'glucoguide'
});

var inserIntoCollection = function(db, data, callback){
    var collection = db.collection('user');
      collection.insert(data, function(err, result){
        assert.equal(err, null);
        callback(result);
      });
    }



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
    var length = results.length;
    for(var i=0; i<length;i++){
      data.push(results[i])
    }
    // console.log(data);
    //connection to mongodb
    var url = 'mongodb://localhost:27017/glucoguide';

        MongoClient.connect(url, function(err, db) {
          if(err){
            console.log('MongoDB connection failed: ' + err);
            return;
          }
          console.log("MongoDB connection  successful");
          var collection = db.collection('user');

          inserIntoCollection(db,data, function() {
            db.close();
          });
        });

 });
});
