app.controller('LoginController', ['$scope', '$location', 'authenticationService', function ($scope,$location, authenticationService) {
        $scope.login = function login() {
            $scope.dataLoading = true;
            authenticationService.login($scope.username,$scope.password);
        };
    }
]);