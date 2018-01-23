'use strict';

var proApp = angular.module('ProApp',[]);

proApp.constant('ForPerson','BiLingual');

proApp.value('UseNext','Dadaji');

proApp.provider('ProSpec', function() {
   this.wishName = "Hello, hi, how are you!";
    
    this.$get = function() {
        var extMsg = this.wishName;
        return function(person) {
            var wholeTag = extMsg + " " + person;
            alert(wholeTag);
        }
    }
    
    this.setProSpecAddAnother = function(ProSpec) {
        this.wishName = ProSpec;
    }
});


