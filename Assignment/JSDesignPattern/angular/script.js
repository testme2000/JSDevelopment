'use strict';

(function() {
    var app = angular.module('taskManager',[]);

    var taskController = function(TaskAng,UrgentTask,TaskRepositoryAng) {
        var ctrl = this;
        ctrl.tasks = [new TaskAng(TaskRepositoryAng.get(1)),
                      new TaskAng(TaskRepositoryAng.get(999)),
                      new TaskAng(TaskRepositoryAng.get(123)),
                      new UrgentTask(TaskRepositoryAng.get(9934))];
        
  
    };
    
    app.controller('taskctrl',taskController);
    
}());