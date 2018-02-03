var app = angular.module('myApp', []);

app.controller('EmpController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.appTitle = "Employee Form"
    $scope.Employees = [];

    $scope.empInfo = {
        id: '',
        name: '',
        job: '',
        salary: 0,
        da:0
    }
    $scope.addEmp = function (empInfo) {
        var da1 = empInfo.salary * (0.1);
       
        $scope.Employees.push({ id: empInfo.id, name: empInfo.name, job: empInfo.job, salary: empInfo.salary , da:da1});
    }

    $scope.removeItem = function (index) {
        $scope.Employees.splice(index, 1);
    }
}]);