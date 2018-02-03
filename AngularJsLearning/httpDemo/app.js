var app = angular.module('myApp', []);
    app.service('HttpService', function ($http) {
        this.getData = function (item) {// item is search term
            url = 'https://itunes.apple.com/search?term=' + item + '&media=music&limit=20';
            return $http.get(url);//returns promise container
        }
    });

    app.controller('httpController', function ($scope, HttpService) {
        $scope.term = 'winter';

        $scope.getData = function (term) {
            HttpService.getData(term)
            .then(function (response) {//resolve
                $scope.resultCount = response.data.resultCount;
                $scope.album = response.data.results;//returns total json data
                console.log(response.data.results);
            },
            function () {//rejected
                $scope.error = "Sorry cant process req...";
            }
            )
        }
    });