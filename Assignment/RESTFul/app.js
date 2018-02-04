var express = require('express'),
    mongoose = require('mongoose'),
    bodyPar = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 8000;

app.use(bodyPar.urlencoded({extended:true}));
app.use(bodyPar.json());

var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function(request,response){
        var newBook = new Book(request.body);
        console.log(newBook);
        response.send(newBook);
    })
    .get(function(request,response){
        var query = {};

        if(request.query.genre) {
            query.genre = request.query.genre;
        }
    
        Book.find(query,function(error,books) {
            if(error) {
                response.status(500).send(error);
            }
            else {
                response.json(books);
            }
        });
});

bookRouter.route('/Books/:bookId')
    .get(function(request,response){
        
        Book.findById(request.params.bookId,function(error,book) {
            if(error) {
                response.status(500).send(error);
            }
            else {
                response.json(book);
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