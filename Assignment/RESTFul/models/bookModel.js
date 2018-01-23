var moongoose = require('mongoose'),
    Schema = moongoose.Schema;

var bookModel = new Schema({
    title: { type:String},
    author: { type:String},
    genre: { type: String},
    read: { type: Boolean, default:false}
});

module.exports = moongoose.model('Book', bookModel);

