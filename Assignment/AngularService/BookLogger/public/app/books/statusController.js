'use strict';

(function() {
    angular.module('app').controller('StatusController', StatusController);
    
    
    function StatusController() {
            
        var StatusCtrl = this;
        
        StatusCtrl.readerStatus = "all is well";
    }
    
}());