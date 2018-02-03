var app = angular.module('myApp', []);//[] is dependency modules can be specified here

//Model
app.service('$LoggerService', function ($log) {//$log is instantiated automatically when service is invoked
    this.logInfo = function (msg) {
        //var $log = new $log(); //its is equal to console.log, avoid using console.log() cz it internally uses window obj
        $log.info(msg);
        //console.log(msg);
    }
});//creating our own service named LoggerService

//controller
app.controller("SimpleController", function ($rootScope, $scope,$LoggerService) {//rootScope is global scope and $scope is local scope i.e local to this controller
    $rootScope.company = "ADP";
    $scope.name = "Akarsh";
    $LoggerService.logInfo($scope.name + "Has accessed SimpleController");
})