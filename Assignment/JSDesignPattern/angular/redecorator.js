'use strict';

(function() {
    var app = angular.module('taskManager');
    
    app.decorator('TaskRepositoryAng', function($delegate) {
        var oldSave = $delegate.save;
        $delegate.save = function(task) {
            console.log("Deleage saving task, please be extra careful " +  task.name);
            oldSave(task);
        }
        return $delegate;
    });
    
}());