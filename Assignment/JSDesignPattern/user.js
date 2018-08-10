'use strict';

var Task = require('./task');
var repo = require('./taskRepository');

var windowTask = new Task(repo.get(999));
var macTask = new Task({name : 'MacOS Task started'});
var linuxTask = new Task({ name : 'Linux Task started'});

windowTask.complete();
windowTask.save();
macTask.save();
linuxTask.save();
