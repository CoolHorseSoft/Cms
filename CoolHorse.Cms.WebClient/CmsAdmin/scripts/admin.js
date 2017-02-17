//ui.router  Provide route services
//ui.bootstrap Provide the collapse directive
var app = angular.module('admin', ['ui.router', 'ui.bootstrap']);

app.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$state = $state;

    $rootScope.app = {
        year : ((new Date()).getFullYear()),
        name: "CoolHorse Soft Co.,Ltd",
        layout: {
            isCollapsed: false,
            isBoxed: false,
            isFixed: true,
            isFloat: false,
            isRTL: false,
            asideHover: false,
            theme: null
        }
    }

    $rootScope.user = {
        name: 'Alexandre',
        job: 'tester',
        picture: 'images/01.jpg'
    };
} ]);