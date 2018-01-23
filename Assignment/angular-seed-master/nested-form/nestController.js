(function(){
    
    var nestApp = angular.module('nestApp');
    nestApp.controller('nestController',function($scope) {
        
        $scope.nestTitle = "Nested Form with AnuglarJS"; 
        $scope.products = [
                            {   name: 'Shirt',
                                price: '12.03'
                            },
            
                            {   name: 'T-Shirt',
                                price: '23.03'
                            },
                            {   name: 'Pant',
                                price: '22.03'
                            },
                            {   name: 'Dockers',
                                price: '32.03'
                            },
                            {   name: 'Pullover',
                                price: '12.03'
                            }
        
        ];
    });
})();

