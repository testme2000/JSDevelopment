(function() {
    angular.module('app')
        .controller('AddBookController',['$log','$location','dataService', AddBookController]) ;

    function AddBookController($log,$location,dataService) {
        var vm = this;
        
        vm.newBook = {};
                                         
        vm.addBook = function() {
            dataService.addBook(vm.newBook)
                    .then(addBookSuccess)
                    .catch(addBookError);
        };

        function addBookSuccess(msg) {
            $log.info(msg);
            $location.path('/');
        }
                                         
        function addBookError(msg) {
            $log.error(msg);                                 
        }
    }
}());