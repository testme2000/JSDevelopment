var express = require('express'),
    mongoose = require('mongoose'),
    bodyPar = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 8000;

app.use(bodyPar.urlencoded({extended:true}));
app.use(bodyPar.json());

var bookRouter = require('./Routes/bookRoutes')(Book);




app.use('/api/books', bookRouter);

// Generate welcome message for contact
app.get('/', function(request,response) {
   response.send('Welcome to BookAPI'); 
});

// Listen to the port for request

app.listen(port, function() {
   console.log('Gulp is watching the Service is running on Port : ' +  port); 
});