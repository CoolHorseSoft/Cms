app.controller('LoginController', ['$scope', '$location', 'authenticationService', function ($scope,$location, authenticationService) {
        (function initController() {
            authenticationService.clearCredentials();
        })();

        $scope.login = function login() {
            $scope.dataLoading = true;
            authenticationService.login($scope.username,
                $scope.password,
                function(response) {
                    if (response.success) {
                        authenticationService.setCredentials($scope.username, $scope.password);
                        $location.path('/category');
                    }
                });
        };
    }
]);