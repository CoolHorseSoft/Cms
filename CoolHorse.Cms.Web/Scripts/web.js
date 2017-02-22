//ui.router  Provide route services
//ui.bootstrap Provide the collapse directive
var app = angular.module('web', []);

app.run(["$rootScope", function ($rootScope) {
    $rootScope.app = {
        layout: {
            isBoxed: true,
            isFixed: true
        }
    }
} ]);