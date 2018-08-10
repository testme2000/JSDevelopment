var myRepo = require('./repo');

//var myRepo = repo();

var taskHandler = function() {
    return {
        save : function() {
            myRepo.save('Hi from special task handler');
        }
    }
}

module.exports = taskHandler();