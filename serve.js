/*
    --------
    QuickAPI
    --------
    Generates a JSON API based on the contents of an SQLite database.
    Visiting /tablename queries the database and returns rows as JSON.
*/

var config = require('./config.js'); // Server and database config files
var express = require('express');
var app = express();
var http = require('http').Server(app);
var sqlite3 = require('sqlite3');

// Has the user specified a database to use (default to config)
var database = process.argv[2] || config.database;

// Routes for serving JSON
app.get('/', function(req, res){
  res.json({ "status": "OK"}); // Root gives default response
})

// A table has been requested
app.get('/:table', function(req, res){
  var table = req.params.table;
  var db = new sqlite3.Database(database);
  db.all("SELECT * FROM " + table, function(err, rows){
    if (err) err["error"] = "" + err; // Error message doesn't exist as a key so add it to the object
    res.json(err || rows);
  });
});

http.listen(config.port, config.ip, function(){
  console.log("Server running -> http://" + config.ip + ":" + config.port);
})
