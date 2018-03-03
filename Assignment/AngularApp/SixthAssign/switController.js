(function(){
    var app = angular.module('switApp');
                    
    app.controller('switController', function($scope) {
        $scope.selection = "header";
    });
})();