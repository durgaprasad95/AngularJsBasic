
(function (undefined) {

    'use strict'
    var app = angular.module('myApp', []);

    app.component('myComponent', {
        templateUrl: "tempComp.html",
        controllerAs:"model",
        controller: function () {
            var model = this;

            model.message = "This is msg"

            model.changeMessage = function () {
                model.message="New Message"
            }
        }


    });

})();
