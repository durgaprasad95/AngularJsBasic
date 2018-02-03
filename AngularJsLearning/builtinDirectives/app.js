var app = angular.module('myApp', []);

app.controller('DirectiveController', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
    $scope.myColor = 'blue';
    $scope.appTitle = 'Understanding Built-in Directives';

    $rootScope.empName = 'Akarsh';
    $scope.products = [{ name: 'pendrive', price: 200 },
        { name: 'mouse', price: 400 },
        { name: 'Keyboard', price: 500 },
        { name: 'Monitor', price: 1000 }];
    $scope.discount = function () {
        alert("Diwali offer 20%");
    }
    $scope.removeItem = function () {
        $scope.products.splice(index, 1);
    }
}]);