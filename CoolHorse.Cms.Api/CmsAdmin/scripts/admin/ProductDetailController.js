app.controller('ProductDetailController', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
    $scope.model = $stateParams.model;

    $scope.cancel = function () { $state.go('productlist'); };

    $scope.save = function () {
        $scope.model.Content = tinymce.get('txtContent').getContent();
        if ($scope.model.Id <= 0) {
            $http.post('/api/product/create', $scope.model).success(function () { $state.go('productlist'); });
        } else {
            $http.post('/api/product/update', $scope.model).success(function () { $state.go('productlist'); });
        }
    };
}]);

