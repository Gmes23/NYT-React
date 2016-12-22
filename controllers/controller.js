// dependencies
var express = require('express');
var router = express.Router();
var path = require('path');

// Require Article Schema
var Article = require("../models/Article.js");

// Main "/" Route. This will redirect the user to my rendered React application
router.get('/', function(req, res) {

  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our saved articles.
router.get('/api/saved', function(req, res){
  Article.find({}).sort([
    ["date", "descending"]
  ]).limit(5).exec(function(err, doc){
    if (err) {console.log(err);}
    else{res.send(doc);}
  });
});

// This is the route we will send POST requests to save a new article.
router.post('/api/saved', function(req, res){
  Article.create({
    title: req.body.title,
    date: Date.now(),
    url: req.body.url
  }, function(err){
    if(err){console.log(err);}
    else{res.send("Article is saved");}
  });
});

// This is the route we will send DELETE requests to delete a saved article.
router.delete('/api/saved/:id', function(req, res){
  Article.findByIdAndRemove({ _id: req.params.id }, function(err, doc){
    if(err){console.log(err);}
    else{res.redirect();}
  })
})

module.exports = router;
