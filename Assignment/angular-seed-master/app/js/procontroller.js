'use strict';

proApp.config(function(ProSpecProvider,ForPerson,UseNext) {
    console.log(ForPerson);
    console.log(UseNext);
    var gretString = 'Hi';
    if(ForPerson === 'BiLingual') {
        gretString = 'Ram Ram';
    }
    ProSpecProvider.setProSpecAddAnother(gretString);
});
                   
proApp.controller('ProController',function($scope,ProSpec,ForPerson,UseNext) {
    console.log(ForPerson);
    console.log(UseNext);
    $scope.ProTitle = "This is famous greeting";
    ProSpec(UseNext); 
});

