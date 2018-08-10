'use strict';

var Calc = function(start) {
    var secret = this;
    this.add = function(x) {
        start += x;
        return secret;
    };
    
    this.multiply = function(x) {
        start *= x;
        return secret;
    };
    
    this.equal = function(callback) {
        callback(start);
        return secret;
    };
}

new Calc(0)
    .add(5)
    .multiply(5)
    .equal(function(result) {
        console.log(result); 
});