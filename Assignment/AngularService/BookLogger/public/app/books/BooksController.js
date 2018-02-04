(function() {

    angular.module('app')
        .controller('BooksController',['books','dataService','logger','badgeService','$cookies','$cookieStore', '$log', '$route', 'bookResource','currentUser', BooksController]);


    function BooksController(books,dataService, logger, badgeService, $cookies, $cookieStore, $log, $route, bookResource, currentUser) {

        var vm = this;
        
        vm.appName = books.appName;
        vm.appDesc = books.appDesc;
        console.log("Debug now " +  vm.appName);
        $log.log('Lets run it now');  
        $log.someExtra("How to do you feel to learn the framework");
        
        
        dataService.getUserSummary()
            .then(getUserSummarySuccessResult);
        
        function getUserSummarySuccessResult(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }
        
        vm.allCollection = bookResource.query();
        
        function getBookSuccess(books) {
           // throw 'something bad happen';
            vm.allCollection = books;
            $log.log('All Books retrieved');
        }
        
        function getBookError(reason) {
            console.log("Book returning error " + reason);
        }
        
        
        function getBookNotification(status) {
            console.log("Status received : " + status);
        }
        
        function errorCallBack(msg) {
            console.log("Receive Error : " +  msg);
        }
        
        function getallBookCompleted() {
            console.log("All book received");
        }
        
        vm.deleteBook = function(bookID) {
            console.log("Book deleted " +  bookID);
            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookFail);
        };
        
        function deleteBookSuccess(msg) {
            $log.info(msg);
            $route.reload();
        }
        
        function deleteBookFail(errormsg) {
            $log.error(errormsg);
        }
        
        
        
        vm.allReaders = dataService.getAllReaders();
        vm.getBadge = badgeService.retriveBadge;
        
        vm.favoriteBook = $cookies.favoriteBook;
        vm.currentUser = currentUser;
        console.log("Current book assigned to cache object");
        console.log("**********************");
        console.log(currentUser);
    }


}());