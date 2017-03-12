app.config(["$controllerProvider", function ($controllerProvider) {
    app.controller = $controllerProvider.register;
}]);

//Router configuration start
app.config([
    '$ocLazyLoadProvider', 'LAZY_LOAD_MODULES', function ($ocLazyLoadProvider, LAZY_LOAD_MODULES) {
        'use strict';
        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: LAZY_LOAD_MODULES
        });

    }
]);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider', '$ocLazyLoadProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper, $ocLazyLoadProvider) {
    'use strict';

    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise('/category');

    // 
    // Application Routes
    // -----------------------------------   
    $stateProvider
    .state('category', {
        url: '/category',
        controller: 'CategoryController',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["app","category"]);
            }]
        },
        templateUrl: helper.basepath('category.htm'),
        access: { requiredLogin: true }
    }).state('news', {
        url: '/news',
        controller: 'NewsController',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["app", "newslist"]);
            }]
        },
        templateUrl: helper.basepath('newslist.htm')
    }).state('newsdetail', {
        url: '/newsdetail',
        controller: 'NewsDetailsController',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["app", "newsdetail"]);
            }]
        },
        templateUrl: helper.basepath('newsdetail.htm'),
        params: { model: null }
    }).state('productlist', {
        url: '/productlist',
        controller: 'ProductListController',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["app", "productlist"]);
            }]
        },
        templateUrl: helper.basepath('productlist.htm')
    }).state('productdetail', {
        url: '/productdetail',
        controller: 'ProductDetailController',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["app", "productdetail"]);
            }]
        },
        templateUrl: helper.basepath('productdetail.htm'),
        params: { model: null }
    });
}]);