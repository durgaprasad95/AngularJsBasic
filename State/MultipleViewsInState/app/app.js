var app = angular.module('myApp', ['ui.router']);

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('sample1', {
            url: '/sample1/:a/:b',
            templateUrl: 'msg1.html',
            controller: 'msg1'
        })
        .state('sample2', {
            url: '/sample2/:a/:b',
            views: {
                '': { //unnamed view
                    templateUrl: 'msg1.html',
                    controller: 'msg1'
                },
                namedView: {
                    template:'<h1><em>2nd View</em></h1>'
                }
            }
        })

         .state('sample3', {
             url: '/sample3',
             views: {
                 headView: {
                     template: '<h1><em>Fetching data From Server</em></h1>'
                 },
                 bodyView: {
                     templateUrl: 'httpGet.html',
                     controller: 'myController'
                 }
             }
         })
        .state('root', {
            url: '/',
            template: 'Click Any Link'
        })
    
}]);

app.controller('msg1', ['$scope','$stateParams', function ($scope,$stateParams) {
    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;
}])

app.controller('myController', function ($scope, $http, $templateCache) {

    $http.get('https://thingspeak.com/channels/245802/feed.json').then(function (response) {
        $scope.status = response.status;
        $scope.givenVal = response.data.feeds;
    }, function (response) {
        $scope.givenVal = response.data.feeds || 'Request failed';
        $scope.status = response.status;
    });

})