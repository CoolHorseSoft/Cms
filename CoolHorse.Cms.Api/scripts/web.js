var app = angular.module('web', ['ui.bootstrap', 'ngSanitize']);

app.run(["$rootScope", function ($rootScope) {
    $rootScope.app = {
        layout: {
            isBoxed: true,
            isFixed: true
        }
    }
}]);

app.controller('MyCarouselController', ['$scope', function ($scope) {
    var slides = $scope.slides = [];
    $scope.addSlide = function () {
        slides.push({ image: 'http://www.csdlc.com/images/up_images/20144258427.jpg' });
        slides.push({ image: 'http://www.csdlc.com/images/up_images/201442584232.jpg' });
        slides.push({ image: 'http://www.csdlc.com/images/up_images/201442584218.jpg' });
    };
    $scope.addSlide();
    $scope.myInterval = 10000;
}]);

app.controller('webNewsDetailsController', ['$scope', '$http', function ($scope, $http) {
    $scope.model = {};

    $http({
        method: 'GET',
        url: '/api/news/GetById/23'
    }).then(function (model) {
        $scope.model = model.data;
    });
}]);