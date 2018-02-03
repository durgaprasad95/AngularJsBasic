var app = angular.module('myApp', []);
app.controller('myController', function ($scope, $http, $templateCache) {
    $scope.inputParam = 0;
    $scope.postData = function (data) {
        $scope.inputParam = data;
        $http.post('https://api.thingspeak.com/update?api_key=E22XH56VNLVFXOMB&field1='+$scope.inputParam).then(function (response) {
            $scope.status = response.status;
            $scope.entryCount = response.data;
        }, function (response) {
            $scope.entryCount = response.data || 'Request failed';
            $scope.status = response.status;
        });

    }
   
})