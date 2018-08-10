'use strict';

(function() {
    angular.module('app').controller('EditBookController', ['$routeParams','books', '$cookies', '$cookieStore','dataService','$log','$location', 'bookResource','currentUser', EditBookController]);
    
    function EditBookController($routeParams,books,$cookies, $cookieStore, dataService, $log, $location, bookResource, currentUser) {
        var editBook = this;
       
                
        editBook.currentBook = bookResource.get({ book_id : $routeParams.bookID});
        $log.debug(editBook.currentBook);
        
        function getBookSuccess(book) {
            editBook.currentBook = book;
            // Store entire book detail in current user session
            currentUser.lastBookEdited = editBook.currentBook;
        }
        
        function getBookFail(error) {
            $log.error(error);
        }
        
        // Mark as Favorite book
        editBook.setAsFavorite = function() {
            alert("TESt");
            $cookies.favoriteBook = editBook.currentBook.title;
        }
        
        editBook.saveBook = function() {
            editBook.currentBook.$update();
            $location.path('/');
        };
        
        function updateBookSuccess(msg) {
            $log.info(msg);
            $location.path('/');
        }
        
        function updateBookFail(errorInfo) {
            $log.error(errorInfo);
        }
    }
}());