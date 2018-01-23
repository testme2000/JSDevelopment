'use strict';

var MainApp = angular.module('MainApp',['ngRoute']);


MainApp.config(function($routeProvider,$locationProvider) {
    console.log('TEst');
    $routeProvider.when('/greet', {
            controller: 'GreetController',
            templateUrl: 'greet.html'
    }).when('/currentdate', {
            controller: 'CurrentController',
            templateUrl: 'current.html'
    }).otherwise({redirectTo: '/greet'});
    
    $locationProvider.html5Mode(true);
});
