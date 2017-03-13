app.controller('LoginController', ['$scope', '$location', 'authenticationService', function ($scope,$location, authenticationService) {
        (function initController() {
            authenticationService.ClearCredentials();
        })();

        $scope.login = function login() {
            $scope.dataLoading = true;
            authenticationService.Login($scope.username,
                $scope.password,
                function(response) {
                    if (response.success) {
                        authenticationService.SetCredentials($scope.username, $scope.password);
                        $location.path('/category');
                    }
                });
        };
    }
]);