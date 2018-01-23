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


// Lets do subclassing

var superimportant = function(name,priority) {
    Task.call(this, name);
    this.priority = priority;
}

superimportant.prototype = Object.create(Task.prototype);

superimportant.prototype.notify = function() {
    console.log("This is super important, pay attention " + this.name);
}

superimportant.prototype.save = function() {
    this.notify();
    console.log("This is saving part for superimportant " + this.name);
    Task.prototype.save.call(this);
}

var work = new superimportant('Visit Dell',999);
work.complete();
work.notify();
work.save();
console.log(work);