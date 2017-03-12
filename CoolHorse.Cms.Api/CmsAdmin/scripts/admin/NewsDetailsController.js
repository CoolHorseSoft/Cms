app.controller('NewsDetailsController', ['$scope', '$http', '$state', '$stateParams', '$templateCache','dataService', function ($scope, $http, $state, $stateParams,$templateCache, dataService) {
    $scope.availableCategories = [];
    dataService.getResources('/api/category/GetAll', function (data) {
        $scope.availableCategories = data.Response;
        $scope.selectedCategoryId = $stateParams.model.Category.Id > 0 ? $stateParams.model.Category.Id : "";
    });

    $scope.model = $stateParams.model;

    if ($scope.model.Id <= 0) {
        $scope.model.Content = $templateCache.get("NewsTemplate.html");
    }

    $scope.cancel = function () { $state.go('news'); };

    $scope.save = function () {
        tinymce.activeEditor.save();

        if (!$('#newsEditForm').valid()) {
            return false;
        }
        $scope.model.Content = tinymce.activeEditor.getContent();
        $scope.model.Category.Id = $scope.selectedCategoryId;
        if ($scope.model.Id <= 0) {
            $http.post('/api/news/create', $scope.model).success(function () { $state.go('news'); });
        } else {
            $http.post('/api/news/update', $scope.model).success(function () { $state.go('news'); });
        }
    };

    $.validator.addMethod('selectRequired',
        function (value, element, params) {
            if ($(element).val() === "") {
                return false;
            }
            return true;
        },
        "请选择类别");

    $.validator.addMethod('editorRequired',
        function (value, element, params) {
            if ($(element).val() === "") {
                return false;
            }
            return true;
        },
        "请输入文章内容或从模板中选择一个合适的模板进行编辑");

    $(document).ready(function () {
        $('#newsEditForm').validate({
            errorClass: 'text-danger',
            ignore: [],
            rules: {
                optCategory: {
                    selectRequired: true
                },
                txtContent: {
                    editorRequired: true
                },
                txtTitle: {
                    required: true
                }
            },
            messages: {
                txtTitle: "请输入标题"
            }
        });
    });
}]);
