'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

const express = require('express');
const app = new express();
const JSON = require('json-parser');

var serverPort = 8080;

//database
const MongoClient = require('mongodb').MongoClient;

// Connection URL to mlab
const url = 'mongodb://dummyuser:dummyuser22@ds249503.mlab.com:49503/motodb';

// Database Name
const dbName = 'motodb';
var db;
var motos;

//Connection to mongodb database
MongoClient.connect(url, function(err, client) {
  if (client != null) {
    console.log("Connected successfully to server");
    db = client.db(dbName);
    motos = db.collection('brands');
  } else {
    console.log("could not connect to the database");
  }
});

//adds the html and css files to the context
app.use(express.static("."));

//returns the main reactive page when the right url is quire
app.get('/', function(request, response){
    response.sendFile('index.html');
});

app.get('/motos', (request, response) => {
  console.log('I received a get request. Now querying the database');
  // querying the database and putting the results in the http response
  motos.find({}).toArray(function(err, res)  {
    response.send(res);
  });

});

app.listen(process.env.PORT || serverPort);
