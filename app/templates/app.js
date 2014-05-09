'use strict';

var app = angular.module('app', [ 'ui.router', 'ui.bootstrap', 'restangular', 'textAngular'  ]);

app.constant("apiUrl", "http://localhost/api/");

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, apiUrl) {
    $locationProvider.html5Mode(false);

    // For any unmatched url, redirect to home state
    $urlRouterProvider.otherwise("/");

    // setup the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/home/home.html",
            controller: 'HomeCtrl'

        });

    RestangularProvider.setBaseUrl(apiUrl);
    RestangularProvider.setRestangularFields({
        id: 'Id'
    });

});

app.run(function ($rootScope) {

});

app.filter('unsafe', function($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('customAutofocus', function() {
    return{
        restrict: 'A',

        link: function(scope, element, attrs){
            scope.$watch(function(){
                return scope.$eval(attrs.customAutofocus);
            },function (newValue){
                if (newValue == true){
                    element[0].focus();//use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
                }
            });
        }
    };
});