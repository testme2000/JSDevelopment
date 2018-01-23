'use strict';

var TaskRepo = (function() {
    var taskRepo;
    
    function createRepo() {
        var taskRepo = new Object("Task");
        return taskRepo;
    }
    
    return {
        getInstance : function() {
            if(!taskRepo) {
                createRepo();
            }
            return taskRepo;
        }
    };
}());

var instan1 = TaskRepo.getInstance();
var instan2 = TaskRepo.getInstance();

if(instan1 === instan2) {
    console.log("We got singleton instance");
}