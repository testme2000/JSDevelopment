'use strict';

(function() {
    angular.module('app').service('logger', BookExtLogger);
    
    function LoggerBase() {

    }

    LoggerBase.prototype.output = function(message) {
        console.log("Book Service : " + message);
    };

    function BookExtLogger() {
        LoggerBase.call(this);

        this.logBook = function(book) {
            console.log('Book : ' + book.title);
        } 
    };

    BookExtLogger.prototype = Object.create(LoggerBase.prototype);
    
}());