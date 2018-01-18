'use strict';

(function() {
    angular.module('app').controller('EditBookController', ['$routeParams','books', '$cookies', '$cookieStore','dataService','$log','$location', 'bookResource', EditBookController]);
    
    function EditBookController($routeParams,books,$cookies, $cookieStore, dataService, $log, $location, bookResource) {
        var editBook = this;
       
        /*dataService.getBookByID($routeParams.bookID)
        .then(getBookSuccess)
        .catch(getBookFail);*/
        
        editBook.currentBook = bookResource.get({ book_id : $routeParams.bookID});
        $log.debug(editBook.currentBook);
        
        function getBookSuccess(book) {
            editBook.currentBook = book;
            // Store entire book detail in cookie
            $cookieStore.put('finalUserSelection',editBook.currentBook);
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
//            dataService.updateBook(editBook.currentBook)
//                    .then(updateBookSuccess)
//                    .catch(updateBookFail);
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