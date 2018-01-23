'use strict';


var repo = function() {
    var called = 0;
    
    var save = function(task) {
        called++;
        console.log("Saving " + task + "called " + called + "times");
    }
    // creating new instance
    console.log("New Instance created");
    return {
        save : save
    }
}

module.exports = new repo;