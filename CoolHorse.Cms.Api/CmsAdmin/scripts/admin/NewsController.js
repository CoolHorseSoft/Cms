app.controller('NewsController', ['$scope', '$http', '$timeout', '$state', 'ngDialog', 'dataService', function ($scope, $http, $timeout, $state, dialog, dataService) {


    $scope.totalServerItems = 0;

    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],  // page size options
        pageSize: 5,              // default page size
        currentPage: 1                 // initial page
    };

    $scope.dialog = {};

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        rowHeight: 36,
        headerRowHeight: 38,
        multiSelect: false,
        pagingOptions: $scope.pagingOptions,
        keepLastSelected: false,
        showSelectionCheckbox: true,
        selectedItems: [],
        columnDefs: [
            { field: 'Title', displayName: '标题' },
            { field: 'Category.Title', displayName: '类别' },
            { field: 'DateUpdated', displayName: '最后更新', cellFilter: "date:'yyyy-MM-dd'" }
        ]
    };

    $scope.setPagingData = function (data, page, pageSize) {
        // calc for pager
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        // Store data from server
        $scope.myData = pagedData;
        // Update server side data length
        $scope.totalServerItems = data.length;

        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };

    $scope.getPagedDataAsync = function (pageSize, page) {
        var ngGridResourcePath = '/api/news/GetAll';

        $timeout(function () {
            $http.get(ngGridResourcePath).success(function (largeLoad) {
                $scope.setPagingData(largeLoad, page, pageSize);
            });
        }, 100);
    };

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize)) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    var openDialog = function (templateId, data) {
        $scope.dialog = dialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: data
        });
    }

    $scope.delete = function () {
        if ($scope.gridOptions.selectedItems.length <= 0) {
            return;
        }
        openDialog('DeleteConfirm.html', $scope.gridOptions.selectedItems[0]);
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
