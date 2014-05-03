'use strict';

var app = angular.module('app', [ 'ui.router', 'ui.bootstrap' ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false);

    // For any unmatched url, redirect to home state
    $urlRouterProvider.otherwise("/");

    // setup the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/home/home.html"

        });
});

app.run(function ($rootScope) {

});
