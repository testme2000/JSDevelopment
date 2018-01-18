(function() {

    var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']);
    
    app.provider('books',['constants',function(constants) {
        this.$get = function() {
                var appName = constants.APP_TITLE;
                var appDesc = constants.APP_DESCRIPTION;
            
                var version = constants.APP_VERSION;
            
                if(includeVersionInTitle){
                    appName += " " + version;
                }
            
                if(includeAuthorInfo) {
                    appDesc += " " + "Power by me using Dell Resource without Manager permission";
                }
                
                return {
                    appName: appName,
                    appDesc: appDesc
                };
        };
        
        var includeVersionInTitle = false;
        var includeAuthorInfo = false;
        
        this.setIncludeVersionInTitle = function(value) {
            includeVersionInTitle = value;
        }
        
        this.setIncludeAuthorInfo = function(value) {
            includeAuthorInfo = value;
        }
        
    }]);

    app.config(['booksProvider','constants','$routeProvider','$httpProvider', '$logProvider', function(booksProvider,constants, $routeProvider, $httpProvider, $logProvider){
        booksProvider.setIncludeVersionInTitle(true);
        booksProvider.setIncludeAuthorInfo(true);
        $logProvider.debugEnabled(true);
        
        //$httpProvider.interceptors.push('bookLoggerInterceptor');
        
        
        $routeProvider
            .when('/', {
                templateUrl: '/app/templates/books.html',
                controller: 'BooksController',
                controllerAs: 'vm'
        })
        .when('/AddBook', {
                templateUrl: '/app/templates/addBook.html',
                controller:  'AddBookController',
                controllerAs: 'bookAdder'
        })
        .when('/EditBook/:bookID', {
                templateUrl: '/app/templates/editBook.html',
                controller: 'EditBookController',
                controllerAs: 'editBook'
        })
        .when('/Status', {
                templateUrl: '/app/templates/status.html',
                controller: 'StatusController',
                controllerAs: 'StatusCtrl'
        })
        .otherwise('/');
    }]);
    
    // We are dealing with $rootScope event
    app.run(['$rootScope', function($rootScope){
        
        $rootScope.$on('$rootChangeSuccess', function(event, current, previous){
           console.log('Successfully changing status'); 
        });
        
        $rootScope.$on('$rootChangeError', function(event,current,previous, rejection) {
           console.log('error changing routes'); 
        });
    }]);
}());