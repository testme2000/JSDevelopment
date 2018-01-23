'use strict';

var express = require('express'),
    app = express(),
    consolid = require('consolidate'),
    bodyParser = require('body-parser');

app.engine('html',consolid.swig);
app.set('view engine','html');
app.set('views',__dirname + '/views');
app.use(bodyParser.urlencoded({extended:true}));


// Handler for server error, in case something goes wrong
function errorHandler(error, request, response, next) {
    console.error(error.message);
    console.error(error.stack);
    response.status(500);
    response.render('error_template',{error: error});
}




app.get('/', function(request, response, next){
    response.render('fruitPicker', { 'fruits' : ['apple','orange','banana','pineapple','berry'] }); 
});


app.post('/favorite_fruit', function(req,resp,next) {
    console.log(req.body);
    var favorite = req.body.fruit;
    if(typeof favorite == 'undefined') {
        next(error('please select something'));
    }
    else {
        resp.send('fruit selection is '  + favorite);
    }
});


app.use(errorHandler);

var server = app.listen(5000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});



