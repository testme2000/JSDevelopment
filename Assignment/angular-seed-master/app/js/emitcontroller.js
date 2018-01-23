'use strict';


EmitApp.controller('EmitBroadcastController',function($scope,$timeout){
    $scope.TrialMessage = "Welcome to Emit and Broadcast future";
    $scope.SenderMessage = "This is sender";
    
    $scope.message = [{ 
        sender: 'PrimeUser',
        text: 'Hello Get ready to roll'
    }];
    var timer;
    var count=0;
    
    $scope.loadMessages = function() {
        count++;
        $scope.message.push({
            sender: 'PrimeUser',
            text: 'Next Message with count ' + count
        });
        timer = $timeout($scope.loadMessages,5000);
        if(count == 15) {
            $scope.$broadcast('EVENT_NO_DATA','Not Connected');
            $timeout.cancel(timer);
        }
        else {
            // Broadcast current status
            
            $scope.$broadcast('EVENT_DATA',$scope.message[$scope.message.length - 1].text);
        }
    };
    
    timer = $timeout($scope.loadMessages, 5000);
    $scope.$on('EVENT_RECEIVED', function() {
        console.log('We are broadcasting the message');
    });

});
                
EmitApp.controller('EmitStatController', function($scope) {
    $scope.ReceiverMessage = "This is receiver";
    $scope.name = 'We are rolling';
    $scope.status = 'Connected';
    $scope.signal = 'Green';
    
    $scope.$on('EVENT_NO_DATA', function(event,data){
        console.log('Recevied no data message');
        $scope.status = data;
        $scope.signal = 'Red';
        $scope.$emit('EVENT_RECEIVED');
    });
    
    $scope.$on('EVENT_DATA', function(event,data){
        $scope.status = data;
        $scope.signal = 'Green';
    });

});

