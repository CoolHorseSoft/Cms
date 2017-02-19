app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
    'use strict';

    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise('/app');

    // 
    // Application Routes
    // -----------------------------------   
    $stateProvider
    .state('app', {
        url: '/app',
        templateUrl: helper.basepath('app.htm')
    }).state('category', {
        url: '/category',
        templateUrl: helper.basepath('category.htm')
    });
} ]);