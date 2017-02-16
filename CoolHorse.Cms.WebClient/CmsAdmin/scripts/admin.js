//ui.router  Provide route services
//ui.bootstrap Provide the collapse directive
var app = angular.module('admin', ['ui.router', 'ui.bootstrap']);

app.run(["$rootScope", function ($rootScope) {
    $rootScope.app = {
        year : ((new Date()).getFullYear()),
        name : "CoolHorse Soft Co.,Ltd"
    }
} ]);