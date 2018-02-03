var app = angular.module('myApp', []);
app.directive('scopeTest2', function () {

    return {
        restrict: 'EA',
        scope: false, //true implies value is inherited from controller, false implies shared scope
        template: '<p>Enter name: <input type="text" ng-model="name"></p>'
    }
})

app.controller('app', function ($scope) {
    $scope.name = "ADP"
   
})

