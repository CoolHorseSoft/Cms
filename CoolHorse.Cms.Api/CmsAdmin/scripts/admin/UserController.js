app.controller('UserController', ['$rootScope', '$scope', 'ngDialog', 'dataService', function ($rootScope,$scope, ngDialog, dataService) {
    var getData = function () {
        dataService.getResources('/api/user/GetAll', function (data) { $scope.myData = data.Response; });
    }

    var getAllRoles = function () {
        dataService.getResources('/api/role/GetAll', function (data) { $scope.allAvailableRoles = data.Response; });
    }

    var getAllRoleGroups = function () {
        dataService.getResources('/api/rolegroup/GetAll', function (data) { $scope.allAvailableRoleGroups = data.Response; });
    }

    var callBackForUpdate = function (data) {
        if (data.ErrorMessage && data.ErrorMessage !== "") {
            $.notify(data.ErrorMessage, { status: 'danger', pos: 'top-center', timeout: 500 });
            return false;
        }

        return true;
    }

    getData();
    getAllRoles();
    getAllRoleGroups();

    $scope.isSelected = function (userModel, roleId) {
        var existingRole = $.grep(userModel.Roles, function (v, i) { return v.Id === roleId });
        return (existingRole && existingRole.length > 0);
    }

    $scope.updateSelection = function (e, userModel, roleId) {
        if (e.target.checked) {
            userModel.Roles.push({ Id: roleId });
        } else {
            var existingRole = $.grep(userModel.Roles, function (v, i) { return v.Id === roleId });
            if (existingRole.length === 1) {
                userModel.Roles.splice($.inArray(existingRole[0], userModel.Roles), 1);
            }
        }
    }

    $scope.isGroupSelected = function (userModel, groupId) {
        var existingRoleGroup = $.grep(userModel.RoleGroups, function (v, i) { return v.Id === groupId });
        return (existingRoleGroup && existingRoleGroup.length > 0);
    }

    $scope.updateGroupSelection = function (e, userModel, groupModel) {
        if (e.target.checked) {
            userModel.RoleGroups.push(groupModel);
        } else {
            var existingRoleGroup = $.grep(userModel.RoleGroups, function (v, i) { return v.Id === groupModel.Id });
            if (existingRoleGroup.length === 1) {
                userModel.RoleGroups.splice($.inArray(existingRoleGroup[0], userModel.RoleGroups), 1);
            }
        }
    }

    $scope.gridOption = $.extend({}, $rootScope.defaultGridOptions,{
        columnDefs: [
            { field: 'UserName', displayName: '用户名' },
            { field: 'DateUpdated', displayName: '最后登录' }
        ]});

    $scope.openDialog = function(operationType) {
        if (operationType === 1) {
            var newItem = { Id: -1, UserName: '', Password: '', Roles: [], RoleGroups:[]};
            $.extend(newItem, { allAvailableRoles: $scope.allAvailableRoles, allAvailableRoleGroups: $scope.allAvailableRoleGroups });
            $rootScope.openDialog('InserOrUpdate.html', newItem, $scope, ngDialog);
            return;
        }

        if (operationType === 2) {
            if ($scope.gridOption.selectedItems.length <= 0) {
                return;
            }
            $.extend($scope.gridOption.selectedItems[0], { allAvailableRoles: $scope.allAvailableRoles, allAvailableRoleGroups: $scope.allAvailableRoleGroups });
            $rootScope.openDialog('InserOrUpdate.html', $scope.gridOption.selectedItems[0], $scope, ngDialog);
        }

        if (operationType === 3) {
            if ($scope.gridOption.selectedItems.length <= 0) {
                return;
            }
            $.extend($scope.gridOption.selectedItems[0], { allAvailableRoles: $scope.allAvailableRoles, allAvailableRoleGroups: $scope.allAvailableRoleGroups });
            $rootScope.openDialog('DeleteConfirm.html', $scope.gridOption.selectedItems[0], $scope, ngDialog);
        }
    };

    $scope.saveFromDialog = function(data, operationType) {
        if ($('#form').length > 0 && !$('#form').valid()) {
            return false;
        }
        if ((operationType !== 3) && data) {
            data.Id >= 0
                ? dataService.updateResources('/api/user/Update/',
                    data,
                    function(response) {
                        if (callBackForUpdate(response)) {
                            getData();
                            ngDialog.closeAll();
                        }
                        return false;
                    })
                : dataService.updateResources('/api/user/Create/',
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
            dataService.updateResources('/api/user/Delete/',
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
                    txtUserName: {
                        required: true,
                        maxlength: 12
                    },
                    txtPassword: {
                        required: true
                    }
                },
                messages: {
                    txtUserName: {
                        required: "请输入用户名",
                        maxlength: "用户名长度不能大于12个字符"
                    },
                    txtPassword: {
                        required: "请输入用户密码"
                    }
                }
            });
        }
    });
}]);