'use strict';

var expr = require('express'),
    app = expr(),
    factory = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    path = require('path');

app.engine('html',factory.nunjucks);
app.set('view engine','html');
app.set('views',__dirname + '/views');


MongoClient.connect('mongodb://localhost:27017/video',function(err,db) {

    assert.equal(null,err);
    console.log('MongoDB Connection successful, lets pull the record');
    
    
    app.get('/', function(request,response) {
        var myOwnDB = db.db('video');

        // Find some documents in our collection
        myOwnDB.collection('movies').find({}).toArray(function(error,document) {
            response.render('movies',{'movies':document});
        });
    });

    app.use(function(request,response) {
        response.sendStatus(404);  
    });


    var mongoServer = app.listen(4000,function() {
        var port = mongoServer.address().PORT;
        console.log('Mongo Express Server listening to PORt ' + port);
    });
});

