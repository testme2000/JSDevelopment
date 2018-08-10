'use strict';

var express = require('express'),
    app = express(),
    consolid = require('consolidate');

app.engine('html',consolid.swig);
app.set('view engine','html');
app.set('views',__dirname + '/views');
//app.use(app.router);

// Handler for server error, in case something goes wrong
function errorHandler(error, request, response, next) {
    console.error(error.message);
    console.error(error.stack);
    response.status(500);
    response.render('error_template',{error: error});
}

app.use(errorHandler);

app.get('/:name', function(request, response, next){
    var name = request.params.name;
    var getvar1 = request.query.getvar1;
    var getvar2 = request.query.getvar2;
    
    response.render('hello', { name : name, getvar1 : getvar1, getvar2 : getvar2});
});

app.listen(5000);
console.log('Express server listening to port 5000');