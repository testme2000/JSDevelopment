'use strict';

(function(){
    var singApp = angular.module('singApp');
    // Initial Controller
    singApp.controller('singController',['$scope','$location', function($scope,$location) {
        $scope.isActive = function(viewLocation) {
            return $location.path().indexOf(viewLocation) == 0;
        };
    }])
    // Main Controller
    singApp.controller('mainController',['$scope','$location', function($scope,$location) {
        $scope.isActive = function(viewLocation) {
            return $location.path().indexOf(viewLocation) == 0;
        };
    }])
    // Message Specific Controller
    singApp.controller('homeController',['$scope', function($scope) {
        $scope.message = 'Home Page';
    }])
    
    singApp.controller('aboutController', ['$scope', function($scope) {
        $scope.message = 'About Page';
    }])
    
    singApp.controller('contactController', ['$scope', function($scope) {
        $scope.message = 'Contact Page';
    }])
    
    // Config the routes
    singApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
        // use the HTML5 History API to remove the '#' from the URL
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        //$locationProvider.html5Mode(true);
        
        $routeProvider
        .when('/home', {
            // route for the home page
            template : '<h1>Home Page</h1><p>{{message}}</p>',
            controller: 'homeController'
        })
        .when('/about', {
            // route for the about page
            template : '<h1>About Page</h1><p>{{message}}</p>',
            controller: 'aboutController'
        })
        .when('/contact', {
            // route for the contact page
            template: '<h1>Contact Page</h1><p>{{message}}</p>',
            controller: 'contactController'
        })
        .otherwise(
            { redirectTo: '/home'}
        );
    }]);
})();