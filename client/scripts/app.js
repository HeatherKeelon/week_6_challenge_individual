var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/home', {
        templateUrl: "/assets/views/routes/home.html"
    }).

    when('/addresses', {
            templateUrl: "/assets/views/routes/addresses.html",
            controller: "MainController"
        }).

    when('/orders', {
            templateUrl: "/assets/views/routes/orders.html",
            controller: "MainController"

        }).

    otherwise({
            redirectTo: 'home'
        })
}]);