'use strict';

var ProApp = angular.module('ProApp',[]);

ProApp.provider('ProSpec', function() {
   this.tagName = "Hello, hi, how are you!";
    
    this.$get = function() {
        return funtion(person) {
            var wholeTag = person + " " + tagName;
            alert(wholeTag);
        }
    }
    
    this.setTag = function(newTag) {
        this.tagName = newTag;
    }
});

