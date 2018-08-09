'use strict';

var express = require('express');
var app = express();
app.use(express.static(__dirname + "/"));

app.get('/', function(req,res,next) {
    res.redirect('/Index.html');
});

app.listen(process.env.PORT || 8080,function() {
    console.log("Battleship Server started on Port 8080");
});


