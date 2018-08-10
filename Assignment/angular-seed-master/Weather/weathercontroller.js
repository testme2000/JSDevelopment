'use strict';

(function(){
    var weatherApp = angular.module('weatherApp');
    
    
    
    weatherApp.controller('weatherController',['$scope','weatherService','WEATHER_DETAIL','$log',function($scope,weatherService,WEATHER_DETAIL,$log){
        $log.log("Setting up Weather Controller");
        // Mark the title
        $scope.weatherAppStatus = "WeatherApp (Supported by AngularJS)"; 
        // Now fetch the wether detail for user specified city and country
        $scope.getWeather = function() {
            $log.log("Fetching weather details for selected city " + $scope.weatherForm.city);
            if($scope.weatherForm.$valid) {
                $scope.weatherStatus = WEATHER_DETAIL.progressMsg;
                weatherService.getWeatherDetail($scope.weatherForm.city,$scope.weatherForm.country)
                    .then(function(data) {
                        $log.log("Result found for city " + $scope.weatherForm.city);
                        $scope.weatherDetail = data;
                    }, function(){
                        $scope.weatherDetail = WEATHER_DETAIL.errorMsg;
                        $log.error("Error occur while fetching weather details for City " + $scope.weatherForm.city);
                    });
            }
        }
        
        $scope.clearResult = function() {
            $scope.weatherDetail = "";
        }
        
    }]);
    
}());