app.controller('ProductListController', ['$rootScope', '$scope', '$state', 'ngDialog', 'dataService', function ($rootScope, $scope, $state, dialog, dataService) {
    $scope.gridOptions = $.extend({}, $rootScope.defaultGridOptions,
        {
            enablePaging: true,
            showFooter: true,
            columnDefs: [
               { field: 'Title', displayName: '标题' },
               { field: 'Category.Title', displayName: '类别' },
               { field: 'DateUpdated', displayName: '最后更新', cellFilter: "date:'yyyy-MM-dd'" }
            ]
        });

    $scope.getPagedDataAsync = function (pageSize, page) {
        dataService.getResources('/api/product/GetAll', function (largeLoad) {
            $rootScope.setPagingData(largeLoad.Response, page, pageSize, $scope);
        });
    };

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize)) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.delete = function () {
        if ($scope.gridOptions.selectedItems.length <= 0) {
            return;
        }
        $rootScope.openDialog('DeleteConfirm.html', $scope.gridOptions.selectedItems[0], $scope, dialog);
    }

    $scope.edit = function (isNew) {
        if (isNew) {
            $state.go('productdetail', { model: { Title: "", Content: "", Id: -1, Category: { Id: -1 } } });
        }
        else {
            if ($scope.gridOptions.selectedItems.length <= 0) {
                return;
            }
            $state.go('productdetail', { model: $scope.gridOptions.selectedItems[0] });
        }
    }

    $scope.deleteFromDialog = function (data) {
        if (data) {
            dataService.updateResources('/api/product/Delete', data.Id, function () {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            });
        }

        dialog.closeAll();
    }
}]);
