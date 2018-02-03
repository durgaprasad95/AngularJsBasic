var app = angular.module('myApp', []);
app.directive('scopeTest', function () {
   
    return {
        restrict: 'EA',
        scope: {
            name: '@',//name which shd match with name in html pg
            type: '=', //two way bind i.e ref is passed here not text
            func: '&'
        },
        template: ['<p>val of name in directive : {{name}}</p>',
            '<p>Enter name: <input type="text" ng-model="name"></p>'
            , '<p>Enter Type: <input type="text" ng-model="type"></p>'
            ,'<input type="button" ng-click="func()" value="Directive" />'
        ].join('')
    }
})

app.controller('app', function ($scope) {
    $scope.name = "ADP"
    $scope.type = "ProductBased"
    $scope.popTheName = function () {
        alert($scope.name);
    }
})


// @ - text bind
// = - two way bind
// & - one way bind