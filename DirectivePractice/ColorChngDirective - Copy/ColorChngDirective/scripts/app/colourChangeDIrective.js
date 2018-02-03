app.directive('changeColor', function () {
	
	return{
        restrict: 'EA',
        scope: {
            colour:'=',
            func:'&',	
        },
		link: function(scope, element, attrs){
			scope.func({colour:'red'});
		},
        template: ['<p>Enter color: <input type="text" ng-model="colour"></p>', '<input type="button" class="btn-primary" ng-click="func()" value="ChangeColorDirective" />'
        ].join('')
    }
})