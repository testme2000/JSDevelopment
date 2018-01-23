angular.module('mySecondApp.controllers',[]).controller('MainTargetController', function($scope) {
    $scope.publisher = 'Penguin';
    $scope. type = 'Business & Finance';
    $scope.name = 'Financial Literacy';
});

angular.module('mySecondApp.controllers').controller('BookController', function($scope) {
    $scope.books = ['Once upon time in Wallstreet','The Intelligent Investor','Random Walk down in Walstreet'];
    $scope.name = 'Books titles';
    $scope.addToWishList = function(book) {
        $scope.wishListCount++;
    };
    $scope.wishListCount = 0;
    unwatchnow = $scope.$watch('wishListCount', function(newValue,oldValue) {
        console.log('called ' + newValue + ' times');
        if(newValue > 1) {
            alert("Finish first book, then go for next one");
            unwatchnow();
        }
    });
    $scope.verifywisdomlevel = function(wisdomage) {
        console.log(wisdomage);
        if(wisdomage < 0) {
            $scope.agewisdom = 0;
        }
        if(wisdomage >= 0 && wisdomage < 10) {
            $scope.wisdomlevel = 'You are still balak';
        }
        else if(wisdomage >= 10 && wisdomage < 20) {
            $scope.wisdomlevel = 'Keep learning, this is right age to absorb everything';
        }
        else if(wisdomage >= 20) {
            $scope.wisdomlevel = "Dude, life is not party, keep working on it but don't get carried away";
        }
    }
    
    $scope.$watch(function() {
       console.log("digent cycle called, be ready");
        return;
    });
});