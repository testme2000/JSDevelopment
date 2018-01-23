'use strict';

(function(){
    var asyncApp = angular.module('asynApp');
    
    asyncApp.controller('asynController',['$scope','$q','$interval',function($scope,$q,$interval) {
        // Add Status Message
        $scope.asynStatus = 'Async Test with AngularJS';
        $scope.getStatusMessage = function() {
            var promise = $scope.getAsynPromise();

            promise.then(function(message) {
                $scope.promiseStatus = "Resolved : " + message;
            }).then(function(message) {
                $scope.promiseStatus += " All done";  
            },function(message) {
                $scope.promiseStatus = "Rejected : " + message;
            }, function(message) {
                $scope.promiseStatus = "Status : " + message;
            });
        }
        // Add Promise method implementation
        $scope.getAsynPromise = function() {
            var i = 0;
            
            var defer = $q.defer();
            
            var timer = $interval(function() {
                if(!! $scope.cancelRequest) {
                    defer.reject('Promise rejected because user cancel it');
                    $interval.cancel(timer);
                }
                i++;
                if(i === 5) {
                    defer.resolve('Promise reached to 5, it is done');
                    $interval.cancel(timer);
                }
                else {
                    defer.notify('Promise count ' + i);
                }
            }, 3000); // Run task every 3 second
            
            // Return promise object
            return defer.promise;
        }
        
        $scope.alwyasRejectPromise = function() {
            var defer = $q.defer();
            defer.reject("Never finish that task");
            return defer.promise;
        }
        
        $scope.alwaysReject = function() {
            var Status = $scope.alwyasRejectPromise();
            Status.then(function(msg) {
                // Never get called
            },function(msg) {
                // Always get called
                $scope.alwaysStatus = msg;
            });
        }
    }]);
}());