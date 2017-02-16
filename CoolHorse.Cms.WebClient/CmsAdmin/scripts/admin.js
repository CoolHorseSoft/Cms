var app = angular.module('admin', []);

app.run(["$rootScope", function ($rootScope) {
    $rootScope.app = {
        year : ((new Date()).getFullYear()),
        name : "CoolHorse Soft Co.,Ltd"
    }
} ]);