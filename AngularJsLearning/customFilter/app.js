angular.module('myApp', [])
    .filter('reverse', function ($filter) {
        return function (input, count) {
            console.log("parameter is: " + count);
            console.log($filter("uppercase")("Testing"));

            var result = "";
            input = input || "";

            for (var i = 0; i < count; i++) {
                result = input.charAt(i) + result;

            }
            return result;
        };
    });