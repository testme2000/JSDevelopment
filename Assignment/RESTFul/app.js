var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 8000;

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(request,response){
        var query = request.query;
    
        Book.find(query,function(error,books) {
            if(error) {
                response.status(500).send(error);
            }
            else {
                response.json(books);
            }
        });
});


app.use('/api', bookRouter);

// Generate welcome message for contact
app.get('/', function(request,response) {
   response.send('Welcome to BookAPI'); 
});

// Listen to the port for request

app.listen(port, function() {
   console.log('Gulp is watching the Service is running on Port : ' +  port); 
});