//'use strict';

var task = {
    title : 'The great task',
    description : 'Lets keep working, we will get somewhere'
};

Object.defineProperty(task,'toString', {
    value : function() {
        return this.title + " " + this.description;
    },
    writable: false,
    enumerable: false,
    configurable: false
});


console.log("--------------------------------------//------------------------------------------------------"); 
console.log(task.toString());
console.log(task);

var urgentTask = Object.create(task);
Object.defineProperty(urgentTask, 'toString', {
    value : function() {
        return this.title + " " + "is urgent, lets getback to work";
    },
    writable: false,
    enumerable: false,
    configurable: false
});
console.log(urgentTask.toString());