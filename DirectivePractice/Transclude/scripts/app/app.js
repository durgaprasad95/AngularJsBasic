var app = angular.module('myApp', []);
app.controller('myController', function ($scope) {


});

//using ng-transclude
app.directive('message1', function () {
    return {
        templateUrl: 'msg1.html',
        transclude:true
    }
});

//using link function
app.directive('message2', function () {
    return {
        templateUrl: 'msg2.html',
        transclude: true,
        link: function (scope, iElement, iAttrs, controller, transclude) {
            var content = transclude();
            console.log(content);
            iElement.find("#innerPanel").append(content);
        }
    }
});

//using directive controller
app.directive('message3', function () {
    return {
        templateUrl: 'msg2.html',
        transclude: true,
        controller: function ($scope,$element,$attrs,$transclude) {
            var content = $transclude();
            alert(content);
            $element.find("#innerPanel").append(content);
        }
    }
});