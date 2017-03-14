app.controller('RoleController', ['$rootScope', '$scope', 'ngDialog', 'dataService', function ($rootScope,$scope, ngDialog, dataService) {
    var getData = function () {
        dataService.getResources('/api/role/GetAll', function (data) { $scope.myData = data.Response; });
    }

    var callBackForUpdate = function (data) {
        if (data.ErrorMessage && data.ErrorMessage !== "") {
            $.notify(data.ErrorMessage, { status: 'danger', pos: 'top-center', timeout: 500 });
            return false;
        }

        return true;
    }

    getData();

    $scope.gridOption = $.extend({}, $rootScope.defaultGridOptions,{
        columnDefs: [
            { field: 'RoleName', displayName: '权限名称' },
            { field: 'Description', displayName: '描述' },
            { field: 'DateUpdated', displayName: '最后修改' }
        ]});

    $scope.openDialog = function(operationType) {
        if (operationType === 1) {
            var newItem = { Id: -1, UserName: '', Password: '' };
            $rootScope.openDialog('InserOrUpdate.html', newItem, $scope, ngDialog);
            return;
        }

        if (operationType === 2) {
            if ($scope.gridOption.selectedItems.length <= 0) {
                return;
            }
            $rootScope.openDialog('InserOrUpdate.html', $scope.gridOption.selectedItems[0], $scope, ngDialog);
        }

        if (operationType === 3) {
            if ($scope.gridOption.selectedItems.length <= 0) {
                return;
            }
            $rootScope.openDialog('DeleteConfirm.html', $scope.gridOption.selectedItems[0], $scope, ngDialog);
        }
    };

    $scope.saveFromDialog = function(data, operationType) {
        if ($('#form').length > 0 && !$('#form').valid()) {
            return false;
        }
        if ((operationType !== 3) && data) {
            data.Id >= 0
                ? dataService.updateResources('/api/role/Update/',
                    data,
                    function(response) {
                        if (callBackForUpdate(response)) {
                            getData();
                            ngDialog.closeAll();
                        }
                        return false;
                    })
                : dataService.updateResources('/api/role/Create/',
                    data,
                    function(response) {
                        if (callBackForUpdate(response)) {
                            getData();
                            ngDialog.closeAll();
                        }
                        return false;
                    });
        }

        if (operationType === 3 && data) {
            dataService.updateResources('/api/role/Delete/',
                data.Id,
                function() {
                    getData();
                    ngDialog.closeAll();
                });
        }
    };

    $scope.$on('ngDialog.opened', function (e, $dialog) {
        if ($('#form').length > 0) {
            $('#form').validate({
                errorClass: 'text-danger',
                rules: {
                    txtRoleName: {
                        required: true,
                        maxlength: 10
                    }
                },
                messages: {
                    txtRoleName: {
                        required: "请输入权限名称",
                        maxlength: "权限名称长度不能大于10个字符"
                    }
                }
            });
        }
    });
}]);