app.controller('CategoryController', ['$scope', '$http', '$timeout', 'ngDialog', 'dataService', function ($scope, $http, $timeout, ngDialog, dataService) {
    var getData = function () {
        dataService.getResources('/api/category/GetAll', function (data) { $scope.myData = data.Response; });
    }

    var openDialog = function (templateId, data) {
        ngDialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: data,
            closeByEscape: false,
            closeByDocument: false
        });
    }

    var callBackForUpdate = function (data) {
        if (data.ErrorMessage && data.ErrorMessage !== "") {
            $.notify(data.ErrorMessage, { status: 'danger', pos: 'top-center', timeout: 500 });
            return false;
        }

        return true;
    }

    getData();

    $scope.gridOption = {
        data: 'myData',
        rowHeight: 36,
        headerRowHeight: 38,
        multiSelect: false,
        keepLastSelected: false,
        showSelectionCheckbox: true,
        selectedItems: [],
        columnDefs: [
            { field: 'Title', displayName: '标题' },
            { field: 'Description', displayName: '类别描述' }
        ]
    };

    $scope.openDialog = function (operationType) {
        if (operationType === 1) {
            var newItem = { Id: -1, Title: '', Description: '' };
            openDialog('InserOrUpdate.html', newItem);
            return;
        }

        if (operationType === 2) {
            if ($scope.gridOption.selectedItems.length <= 0) {
                return;
            }
            openDialog('InserOrUpdate.html', $scope.gridOption.selectedItems[0]);
        }

        if (operationType === 3) {
            if ($scope.gridOption.selectedItems.length <= 0) {
                return;
            }
            openDialog('DeleteConfirm.html', $scope.gridOption.selectedItems[0]);
        }
    }

    $scope.saveFromDialog = function (data, operationType) {
        if ($('#form').length > 0 && !$('#form').valid()) {
            return false;
        }
        if ((operationType !== 3) && data) {
            data.Id >= 0
                ? dataService.updateResources('/api/category/update/', data, function (response) {
                    if (callBackForUpdate(response)) {
                        getData();
                        ngDialog.closeAll();
                    }
                    return false;
                })
                : dataService.updateResources('/api/category/create/', data, function (response) {
                    if (callBackForUpdate(response)) {
                        getData();
                        ngDialog.closeAll();
                    }
                    return false;
                });
        }

        if (operationType === 3 && data) {
            dataService.updateResources('/api/category/Delete/', data.Id, function () {
                getData();
                ngDialog.closeAll();
            });
        }
    }

    $scope.$on('ngDialog.opened', function (e, $dialog) {
        if ($('#form').length > 0) {
            $('#form').validate({
                errorClass: 'text-danger',
                rules: {
                    txtCategoryTitle: {
                        required: true,
                        maxlength: 12
                    }
                },
                messages: {
                    txtCategoryTitle: {
                        required: "请输入类别标题",
                        maxlength: "标题长度不能大于12个字符"
                    }
                }
            });
        }
    });
}]);