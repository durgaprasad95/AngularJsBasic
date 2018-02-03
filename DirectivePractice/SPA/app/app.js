angular.module("spa", ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix("!");

        $routeProvider
            .when("/color", {
                templateUrl: "templates/home.html",
                controllerAs:'vm',
                controller: "myController"
            })
            .when("/DirectiveLink", {
                templateUrl: "templates/directiveLink.html",
                //controller: "lnController"
            })
        .otherwise({ redirectTo: "/color" });
    })
.run(function ($rootScope, $log) {
    //three events will be fired they are
    //$routeChangeSuccess, $routeChangeError, $routeChangeStart 
    $rootScope.$on("$routeChangeStart", function (next, current) {
        $log.info('Routing to next Route...')
    })
})