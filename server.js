// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Create Instance of Express
var app = express();

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// MongoDB Configuration configuration
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Require Article Schema
var Article = require("./models/Article");

// import routes
var router = require('./controllers/controller.js');
app.use('/', router);

// Sets an initial port.
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log('The magic happens on port ' + PORT + '!');
})
