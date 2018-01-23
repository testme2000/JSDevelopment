'use strict';

class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    };
    
    complete() {
        console.log('complete ' + this.name);
        this.completed = true;
    };
    
    save() {
        console.log("Task saved " + this.name);
    };
    
}


var windowTask = new Task('Window task started');
var macTask = new Task('MacOS Task started');
var linuxTask = new Task('Linux Task started');
var android = new Task("Mobile Task");
console.log("test");
windowTask.complete();
windowTask.save();
macTask.save();
linuxTask.save();
android.save();


