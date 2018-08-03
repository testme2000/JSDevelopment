'use strict';

var express = require('express');
var app = express();
app.use(express.static("MyBattleUsingAngular"));

app.get('/', function(req,res,next) {
    res.redirect('/');
});

app.listen(8080,'localhost');
console.log("Battleship Server started");