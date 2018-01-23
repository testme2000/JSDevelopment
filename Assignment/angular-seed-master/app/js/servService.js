'use strict';

ServApp.service('ServService', function($timeout) {
   this.sayGreeting = function(name) {
       $timeout(function() {
        alert('Say Hello to my friend ' + name);
       },5000);
   } 
});