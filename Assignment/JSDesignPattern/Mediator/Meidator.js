'use strict';

var Task = require('./task');

var notificationService = function () {
    var message = 'Notifying ';
    this.update = function (task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
};

var loggingService = function () {
    var message = 'Logging '
    this.update = function (task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
}

var auditingService = function () {
    var message = 'Auditing '
    this.update = function (task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
}

// Implement mediator
var mediator = (function(){
    var channels = [];
    
    var subscribe = function(channel,context,func) {
        if(!mediator.channels[channel]) {
            mediator.channels[channel] = [];
        }
        
        mediator.channels[channel].push({
            context: context,
            func: func
        });
    }
    
    var publish = function(channel) {
        if(!this.channels[channel]) {
            return false;
        }
    }
    
}());

var task1 = Task({
    name: 'Creating working module for NTA',
    user: 'Master Josh'
});

var not = new notificationService();
var log = new loggingService();
var audit = new auditingService();

task1.save();   