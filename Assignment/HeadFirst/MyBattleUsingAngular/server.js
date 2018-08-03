'use strict';

var express = require('express');
var app = express();
app.use(express.static(__dirname + "/"));

app.get('/', function(req,res,next) {
    console.log("TEst");
    res.redirect('/');
});

app.listen(8080,function() {
    console.log("Battleship Server started on Port 8080");
});
