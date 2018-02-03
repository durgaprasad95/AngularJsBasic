app.directive('testDirective', function () {
    return {
        //first phase
        compile: function (tElement,tAttributes) {
            //through these params we can access elements and att from html markup in which our directive is present
            console.log(tAttributes.text + " -In Compile");

            //Third phase
            //compile returns link fns, this will be executed after controller
            return {
                //scope here is the scope which is created in controller
                //it uses the instance of template which is created after compile phase
                pre: function (scope, iElements, iAttributes) {
                    //scope.fun("*********************");
                    console.log(iAttributes.text + " -In Pre");
                },
                post: function (scope, iElements, iAttributes) {
                    console.log(iAttributes.text + " -In Post");
                }
            }
        },

        //second phase
        controller: function ($scope, $element, $attrs) {
            $scope.controllerVar = "Testing controller Var";
            //$scope.fun = function (temp) {
            //    console.log(temp);
            //}
            console.log($attrs.text+" -In Controller");
        }
    }
});