'use strict';
var auctionApp = angular.module('auctionApp', ['ngAnimate','ipCookie','ngResource', 'ngRoute','ui.bootstrap']);

auctionApp.config(['$routeProvider', '$locationProvider' , '$httpProvider', function ($routeProvider, $locationProvider,$httpProvider) {
    $routeProvider
        .when("/", {redirectTo: "/dashBoard"})
        .when("/dashBoard", {templateUrl: "client/partials/dashboard.html"})
        .when("/login", {templateUrl: "client/partials/login.html"})
        .otherwise('/');

    $httpProvider.defaults.useXDomain = false;
    $httpProvider.defaults.withCredentials = false;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

}]);

auctionApp.value('host','http://localhost:3000/');

auctionApp.run(function($rootScope,ipCookie,LoggedInCheck){
    if(ipCookie('auctionCookie')){
        LoggedInCheck.setLogged(true);
        LoggedInCheck.setLoggedDetails(localStorage.getItem('lastLogin'));
    }else{
        LoggedInCheck.setLogged(false);
    }
});

auctionApp.filter('datetime', function($filter){
    return function(input){
        if(input == null){ return ""; }
        var xyz = input.split('T');
        return $filter('date')(new Date(xyz[0]), 'MMM d, y').concat(' ',xyz[1].split('.000Z')[0]);
    };
});


auctionApp.factory('socket', function ($rootScope) {
    var socket = io.connect("http://localhost:8080");
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});