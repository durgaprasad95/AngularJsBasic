var app = angular.module('loginApp', []);
app.value('Metadata', {
    projectName: 'LoginDemo',
    author: 'Akarsh',
    version:'1.0'
});

app.constant('company', 'ADP');

//Model
app.service("$AuthService", ['$http',function ($http) {
    this.authenticate = function (userInfo) {
        var uname = userInfo.userName;
        var pwd = userInfo.password;
        //$http.post('url',userInfo).then
        if(uname==='akarsh' && pwd==='xyz'){
            return true;
        }
        else{
            return false;
        }
    }
}]);

app.controller("LoginController", ['$rootScope', '$scope', '$AuthService', 'Metadata', 'company', function ($rootScope, $scope, $AuthService, Metadata, company) {
    $rootScope.isAuthenticated = false;
    $rootScope.companyName = company;
    $scope.projectName = Metadata.projectName;
    //JSON Binding
    $scope.userInfo = {
        userName: 'akarsh',
        password: ''
        
    }
    $scope.checkUser = function (userInfo) {
        var uname = userInfo.userName;
        if ($AuthService.authenticate(userInfo) == true) {
            $rootScope.isAuthenticated = true;
            $scope.message = "Welcome " + uname;
        }
        else {
            $rootScope.isAuthenticated = false;
            $scope.message = "Invalid Credentials";
        }
    }
}]);