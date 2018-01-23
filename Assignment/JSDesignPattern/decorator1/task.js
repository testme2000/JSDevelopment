'use strict';

var Task = function(name) {
    this.name = name;
    this.completed = false;
    
}

Task.prototype.complete = function() {
        console.log('completed ' + this.name);
        this.completed = true;
}

Task.prototype.save = function() {
    console.log("Task saved " + this.name);

}

var thisTask = new Task('RegularTask');

thisTask.complete();
thisTask.save();


// Ok now apply decorator pattern around task

var importantTask = new Task('Important Task');
importantTask.priority = 999;
importantTask.notify = function() {
    console.log("Completing important task with priority " + this.priority);
}

importantTask.complete();
importantTask.save = function() {
    this.notify();
    Task.prototype.save.call(this);
}
importantTask.save();


