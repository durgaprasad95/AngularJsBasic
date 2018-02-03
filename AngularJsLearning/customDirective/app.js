var app = angular.module('customDirective', []);
app.controller('customController', function ($scope, $rootScope) {
    $rootScope.company = "ADP";
    $scope.message = "Understanding Custom Directives";
});

//creating custom directive
app.directive('customDirective', function () {
    return {
        restrict: 'E',
        scope: true,
        template: "<div class='container bg-info'>{{message}}</div>",
        link: function (scope, element, attr) {
            scope.$watch('message', function (newval) {
                console.log(newval);
            });
            element.bind('click', function () {
                element.css('font-size', '30px');
            });
        }
    }
});