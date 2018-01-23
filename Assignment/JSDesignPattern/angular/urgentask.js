'use strict';

(function() {
    
    var app = angular.module('taskManager');
    
    app.factory('UrgentTask', function(TaskAng,TaskRepositoryAng) {
        var UrgentTask = function(data) {
            TaskAng.call(this,data);
            TaskAng.priority = data.priority;
            
        };
        
        UrgentTask.prototype = Object.create(TaskAng.prototype);

        UrgentTask.prototype.notify = function() {
            console.log("This is super important, pay attention " + this.name);
        };

        UrgentTask.prototype.save = function() {
            this.notify();
            console.log("This is saving part for superimportant " + this.name);
            TaskAng.prototype.save.call(this);
        };
        
        return UrgentTask;
    });    
}());

