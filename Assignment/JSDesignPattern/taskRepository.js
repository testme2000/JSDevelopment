'use strict';

var Repo = function() {
    var get = function(id) {
            console.log("Task retrieve from DB " +  id);
            return {
                name: 'new task from DB'
            }
    }

    var save = function(task) {
        console.log("Saving task to DB " +  task.name);
    }
    
    
    return {
        get: get,
        save: save
    }
}

module.exports = Repo();