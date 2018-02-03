app.controller('myController', function ($scope) {
	$scope.colour = '#34495e';
    $scope.myColor = { 'background-image': 'url("loading.gif")','background-repeat': 'no-repeat','background-size':'auto'};
   $scope.chngColor = function (clr) {
	   console.log(clr);
        $scope.myColor = {background:clr};
        //$scope.myColor = { 'background-image': 'url("source.gif")', 'background-repeat': 'no-repeat', 'background-size': 'auto' };
    }
})