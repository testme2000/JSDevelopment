'use strict';

(function() {
    var app = angular.module('taskManager');
    
    var taskRepoAng = function($http) {
        var invoked = 0;
        var dbData = {};
        
        var get = function(id) {
            invoked++;
                console.log("Task retrieve from DB " +  id);
            console.log("Getting task " + id + " called " + invoked + " times");
            var stringFor = 'new task from db' + ' (' + id + ')';
                return {
                    name: stringFor
                }
        }

        var save = function(task) {
            invoked++;
            console.log("Saving task to DB " +  task.name);
            console.log("Save task called " + invoked + " times");
        }


        return {
            get: get,
            save: save
        }        
    }
    
    
    app.service('TaskRepositoryAng',taskRepoAng);
}());