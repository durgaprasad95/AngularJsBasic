var app = angular.module('myApp', []);
app.directive('nvd3', function () {
    return {
        restrict: 'EA',
        templateUrl:'tree.html'
    }
})