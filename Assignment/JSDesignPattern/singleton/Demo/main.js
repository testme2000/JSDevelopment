'use strict';

var taskHandler = require('./taskHandler');
var myRepo = require('./repo');

//var myRepo = repo();

myRepo.save('fromMain');
myRepo.save('fromMain');
myRepo.save('fromMain');

taskHandler.save();
taskHandler.save();
taskHandler.save();
taskHandler.save();
