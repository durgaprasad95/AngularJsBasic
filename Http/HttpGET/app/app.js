var app = angular.module('myApp',[]);
app.controller('myController', function ($scope, $http, $templateCache) {

    $http.get('https://thingspeak.com/channels/245802/feed.json').then(function (response) {
        $scope.status = response.status;
        $scope.givenVal = response.data.feeds;
    }, function (response) {
        $scope.givenVal = response.data.feeds || 'Request failed';
        $scope.status = response.status;
    });

    //$http.get('emp.json').then(function (response) {
    //    $scope.status = response.status;
    //    $scope.givenVal = response.data.records;
    //}, function (response) {
    //    $scope.givenVal = response.data.records || 'Request failed';
    //    $scope.status = response.status;
    //});

})