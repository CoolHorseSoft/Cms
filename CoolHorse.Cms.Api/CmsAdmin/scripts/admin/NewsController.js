app.controller('NewsController', ['$rootScope', '$scope', '$state', 'ngDialog', 'dataService', function ($rootScope, $scope, $state, dialog, dataService) {
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
        dataService.getResources('/api/news/GetAll', function (largeLoad) {
            $rootScope.setPagingData(largeLoad, page, pageSize, $scope);
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
        $scope.dialog = $rootScope.openDialog('DeleteConfirm.html', $scope.gridOptions.selectedItems[0], $scope);
    }

    $scope.edit = function (isNew) {
        if (isNew) {
            $state.go('newsdetail', { model: { Title: "", Content: "", Id: -1, Category: { Id: -1 } } });
        }
        else {
            if ($scope.gridOptions.selectedItems.length <= 0) {
                return;
            }
            $state.go('newsdetail', { model: $scope.gridOptions.selectedItems[0] });
        }
    }

    $scope.deleteFromDialog = function (data) {
        if (data) {
            deleteData(data);
        }

        $scope.dialog.close();
    }

    var deleteData = function (model) {
        $http.post('/api/news/Delete', model.Id).success(function () {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        });
    }
}]);
