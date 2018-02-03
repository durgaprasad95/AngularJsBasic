angular.module('myApp', [])
.controller('friendsController', function ($scope) {
    $scope.friends = [{
        name: 'Sarath',
        phone: '1234',
        country: 'IN'
    },
    {
        name: 'Chandra Bharan',
        phone: '12345',
        country: 'US'
    },
    {
        name: 'Durga',
        phone: '12346',
        country: 'AUS'
    },
    {
        name: 'Qadeer',
        phone: '12347',
        country: 'IN'
    },
    ];
});