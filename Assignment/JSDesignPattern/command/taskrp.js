'use strict';

var repo = {
    tasks: {},
    commands: [],
    
    get: function(id) {
        console.log('Getting task = ' + id);
        var returnstr = 'new task with id ' + id;
        return {
            name: returnstr
        }
    },
    save: function(task) {
        repo.tasks[task.id] = task;
        console.log('Saving ' +  task.name + 'in database');
    },
    replay: function() {
        for(var count=0;count < repo.commands.length;count++) {
            var command = repo.commands[count];
            repo.executeNoLog(command.name,command.obj);
        }
    }
} 

repo.execute = function(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    
    repo.commands.push({
        name: name,
        obj: args[0]
    });
    
    if(repo[name]) {
        return repo[name].apply(repo, args)
    }
    return false;  
};


repo.executeNoLog = function(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    
    if(repo[name]) {
        return repo[name].apply(repo, args)
    }
    return false;  
};


repo.execute('save',{
    id: 1,
    name: 'Task 1',
    completed: false
});


repo.execute('save',{
    id: 2,
    name: 'Task 2',
    completed: false
});


repo.execute('save',{
    id: 3,
    name: 'Task 3',
    completed: false
});

repo.execute('save',{
    id: 4,
    name: 'Task 4',
    completed: false
});

repo.execute('save',{
    id: 5,
    name: 'Task 5',
    completed: false
});

repo.execute('save',{
    id: 6,
    name: 'Task 6',
    completed: false
});

console.log(repo.tasks);
repo.tasks = {};
console.log(repo.tasks);
repo.replay();
