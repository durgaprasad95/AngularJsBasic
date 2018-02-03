var app = angular.module('myApp', ['ui.router']);

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('firstMessage', {
            url: '/first-msg/:a/:b',
            templateUrl: 'msg1.html',
            controllerAs:'vm',
            controller: 'msg1'
        })
        .state('secondMessage', {
            url: '/second-msg/{a:[0-9]+}/{b}',
            templateUrl: 'msg1.html',
            controllerAs: 'vm',
            controller: 'msg1'
        })
        .state('thirdMessage', {
            url: '/third-msg/:a',//optional i.e 0 or 1 param
            templateUrl: 'msg1.html',
            controllerAs: 'vm',
            controller: 'msg1'
        })
         //.state('fourthMessage', {
         //    url: '/fourth-msg',
         //    templateUrl: 'msg1.html',
         //    controller: 'msg1',
         //    params:{ //default values works only with ui-sref
         //        a: { value: '1' },
         //        b: { value: '2' }
         //    }
         //})
        .state('root', {
            url: '/',
            template: 'Click Any Link'
        })
    
}]);

app.controller('msg1', ['$scope', '$stateParams', function ($scope, $stateParams) {
    var vm = this;
    vm.xyz = "Hello";
    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;
}])