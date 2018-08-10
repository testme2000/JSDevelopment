'use strict';

(function() {
    angular.module('app').factory('dataService',['$q','$timeout','$http','constants', '$cacheFactory', dataService]);
    
    function dataService($q,$timeout,$http,constants,$cacheFactory) {
        
        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook,
            getUserSummary : getUserSummary
        };
        
        function getUserSummary() {
            var deferred = $q.defer();
            
            // Verify that summary available in cache
            var dataStore = $cacheFactory.get('bookLoggerCache');
            
            if(!dataStore) {
                dataStore = $cacheFactory('bookLoggerCache');
            }
            
            // Verify that totalreading minutes available in cache
            var totalFromCache = dataStore.get('summary');
            
            if(totalFromCache) {
                console.log('Total Minutes available in Cache');
                deferred.resolve(totalFromCache);
            }
            else {
                console.log("Here we are generating summary of reading activity");

                var booksPromise = getAllBooks();
                var readersPromise = getAllReaders();

                $q.all([booksPromise,readersPromise])
                    .then(function(bookLoggerData){

                    var allBooks = bookLoggerData[0];
                    var allReaders = bookLoggerData[1];

                    var alltotalMinutes = 0;

                    allReaders.forEach(function(currentReader, index, array) {
                        console.log("Calculating minutes " + currentReader.totalMinutesRead);
                       alltotalMinutes += currentReader.totalMinutesRead; 
                    });

                    var summaryData = {
                        bookCount : allBooks.length,
                        readerCount : allReaders.length,
                        grandTotalMinutes : alltotalMinutes
                    };
                    
                    dataStore.put('summary',summaryData);

                    deferred.resolve(summaryData);
                });
            }
            return deferred.promise;
        }
        
        function deleteSummaryFromCache() {
            var dataFromCache = $cacheFactory.get('bookLoggerCache');
            dataFromCache.remove('summary');
        }
        
        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                },
                transformResponse: transformGetBooks,
                cache: true
            }).then(sendBookResultInfo)
              .catch(sendBookResultError);
        }
        
        function deleteAllBooksResponseFromCache() {
            
            var httpCache = $cacheFactory.get('http');
            httpCache.remove('api/books');
        }
        
        function transformGetBooks(data,headerGet) {
            var jsonresult = angular.fromJson(data);
            jsonresult.forEach(function(currentValue,index,arrays){
                currentValue.dateDownloaded = new Date();
                currentValue.currentKey = "9999";
                console.log(currentValue);
            });
            return jsonresult;
        }
        
        
        function sendBookResultInfo(resultInfo) {
            return resultInfo.data;
        }
        
        function sendBookResultError(errorInfo) {
            return $q.reject('Unable to retrieve book info, HTTP Error - ' +  errorInfo.status);
        }
        
        function getBookByID(bookID) {
            return $http.get('api/books/' + bookID)
                    .then(sendBookResultInfo)
                    .catch(sendBookResultError);
        }
        
        function updateBook(book) {
            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();
            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            })
            .then(updateBookSuccess)
            .catch(updateBookFail);
        }
        
        function updateBookSuccess(response) {
            return 'Book updated ' + response.config.data.title;
        }
        
        function updateBookFail(response) {
            return $q.reject('Unable to update the book, HTTP Error - ' +  response.status);
        }

        function addBook(newBook) {
            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();
            return $http.post('api/books',newBook, {
                transformRequest: transformPostRequest
            })
                .then(addBookSuccess)
                .catch(addBookFail);
        }
        
        function transformPostRequest(data, headerGetter) {
            data.newBook = true;
            
            console.log(data);
            return JSON.stringify(data);
        }
        
        function addBookSuccess(response) {
            return 'Book Added ' +  response.config.data.title;
        }
        
        function addBookFail(response) {
            return $q.reject('Error adding book ' +  response.status);
        }
        
        function deleteBook(bookID) {
            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();
            return $http({
                method: 'DELETE',
                url: 'api/books/' + bookID,
            })
            .then(deleteBookSuccess)
            .catch(deleteBookFail);
        }
        
        function deleteBookSuccess(response) {
            return 'Book Deleted';
        }
        
        function deleteBookFail(response) {
            return $q.reject('Error deleting book ' + response.status);
        }
        
        function getAllReaders() {
            //logger.output("here is all logger's list, lets check our heros");
            return [
              {
                  reader_id: 1,
                  name: 'JB Tapori',
                  weeklyReadingGoal: 315,
                  totalMinutesRead: 2500
              },
              {
                  reader_id: 2,
                  name: 'Dadaji',
                  weeklyReadingGoal: 325,
                  totalMinutesRead: 5400
              },
              {
                  reader_id: 3,
                  name: 'Balak',
                  weeklyReadingGoal: 345,
                  totalMinutesRead: 5900
              }
            ];
        }
        
    }
    
    dataService.$inject = ['logger'];
}());