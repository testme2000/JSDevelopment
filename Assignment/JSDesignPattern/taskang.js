'use strict';

(function() {
    var app = angular.module('taskManager');
    
    app.factory('TaskAng', function(TaskRepositoryAng) {
        var TaskAng = function(data) {
            this.name = data.name;
            this.completed = data.completed;
        }

        TaskAng.prototype.complete = function() {
            console.log('completing task ' + this.name);
            this.completed = true;
            this.save();
        };

        TaskAng.prototype.save = function() {
            console.log('Saving the task ' +  this.name);
            TaskRepositoryAng.save(this);
        };
        return TaskAng;
    });
}());