'use strict';

var express = require('express'),
    cons = require('consolidate'),
    mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/audio', function(error,db){
    assert.equal(null,error);
    
    console.log("Successfully connected to server");
    
    var myOwnDB = db.db('audio');
    
    // Find some documents in our collection
    myOwnDB.collection('audio').find({}).toArray(function(error,docs){
        // Print the title
        docs.forEach(function(doc){
            console.log(doc.title);
            console.log(doc.artist);
        });
        db.close();
    });
    console.log("Collection close");
});