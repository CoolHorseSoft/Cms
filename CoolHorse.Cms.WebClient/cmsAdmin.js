if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

var cmsApp = angular.module("cmsAdmin", ['ui.router', 'pascalprecht.translate' ]);

cmsApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
    'use strict';

    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    // defaults to dashboard
    $urlRouterProvider.otherwise('/app');

    // 
    // Application Routes
    // -----------------------------------   
    $stateProvider
    .state('app', {
        url: '/app',
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController'
    });
} ]);

cmsApp.provider('RouteHelpers',function () {
    "use strict";

    // Set here the base of the relative path
    // for all app views
    this.basepath = function (uri) {
        return 'Html/' + uri;
    };

    // not necessary, only used in config block for routes
    this.$get = function () {
        return {
            basepath: this.basepath
        }
    };

});

cmsApp.controller('AppController', ['$translate', function ($translate) { } ]);