app.directive('testDirective', function ($interpolate) {//$interpolate is used to evaluate the exp against the scope in controller
    return {
        //first phase
        compile: function (tElement,tAttributes) {
            //through these params we can access elements and att from html markup in which our directive is present
            console.log(tAttributes.text + " -In Compile");
            tElement.css("border", "1px solid #C0C0C0");

            //Third phase
            //compile returns link fns, this will be executed after controller
            return {
                //scope here is the scope which is created in controller
                //it uses the instance of template which is created after compile phase
                pre: function (scope, iElements, iAttributes) {
                    console.log(iAttributes.text + " -In Pre");
                },
                post: function (scope, iElements, iAttributes) {
                    console.log(iAttributes.text + " -In Post");
                    iElements.on('click', function () {
                        iElements.css("border", "2px solid green");
                        console.log("clicked: "+iAttributes.text);
                    })
                }
            }
        },

        //second phase
        controller: function ($scope, $element, $attrs) {
            $scope.controllerVar = "Testing controller Var";
            $scope.onOff = "light_bulb.png";
            $scope.chng = function () {
                $scope.onOff = "light_bulb_on.png";
            }
            var x = $interpolate($attrs.text)($scope);//evaluating the {{i}} val in html against scope
            console.log(x+" -In Controller");
        }
    }
});