app.controller('AppController', ['$scope', function ($scope) {
    "use strict";

    $scope.toggleUserBlock = function () {
        $scope.$broadcast('toggleUserBlock');
    };
}]);

app.controller('UserBlockController', ['$scope', function ($scope) {

    $scope.userBlockVisible = false;

    $scope.$on('toggleUserBlock', function (event, args) {

        $scope.userBlockVisible = !$scope.userBlockVisible;

    });

}]);

app.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils',
  function ($rootScope, $scope, $state, $http, $timeout, Utils) {

      var collapseList = [];

      // demo: when switch from collapse to hover, close all items
      $rootScope.$watch('app.layout.asideHover', function (oldVal, newVal) {
          if (newVal === false && oldVal === true) {
              closeAllBut(-1);
          }
      });

      // Check item and children active state
      var isActive = function (item) {

          if (!item) return;

          if (!item.sref || item.sref == '#') {
              var foundActive = false;
              angular.forEach(item.submenu, function (value, key) {
                  if (isActive(value)) foundActive = true;
              });
              return foundActive;
          }
          else
              return $state.is(item.sref) || $state.includes(item.sref);
      };

      // Load menu from json file
      // ----------------------------------- 

      $scope.getMenuItemPropClasses = function (item) {
          return (item.heading ? 'nav-heading' : '') +
                 (isActive(item) ? ' active' : '');
      };

      $scope.menuItems = [{
          "text": "基础配置",
          "heading": "true"
      },
                           {
                               "text": "类别管理",
                               "sref": "category",
                               "icon": "icon-speedometer"
                           },
                           {
                               "text": "新闻管理",
                               "heading": "true"
                           },
                           {
                               "text": "新闻列表",
                               "sref": "news",
                               "icon": "icon-grid"
                           },
                           {
                               "text": "产品管理",
                               "heading": "true"
                           },
                           {
                               "text": "产品列表",
                               "sref": "productlist",
                               "icon": "icon-layers"
                           }
      ];

      // Handle sidebar collapse items
      // ----------------------------------- 

      $scope.addCollapse = function ($index, item) {
          collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
      };

      $scope.isCollapse = function ($index) {
          return (collapseList[$index]);
      };

      $scope.toggleCollapse = function ($index, isParentItem) {


          // collapsed sidebar doesn't toggle drodopwn
          if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

          // make sure the item index exists
          if (angular.isDefined(collapseList[$index])) {
              if (!$scope.lastEventFromChild) {
                  collapseList[$index] = !collapseList[$index];
                  closeAllBut($index);
              }
          }
          else if (isParentItem) {
              closeAllBut(-1);
          }

          $scope.lastEventFromChild = isChild($index);

          return true;

      };

      function closeAllBut(index) {
          index += '';
          for (var i in collapseList) {
              if (index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
          }
      }

      function isChild($index) {
          return (typeof $index === 'string') && !($index.indexOf('-') < 0);
      }

  }]);

app.controller('CategoryController', ['$scope', '$http', '$timeout', 'ngDialog', function ($scope, $http, $timeout, dialog) {
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

    $scope.dialog = {};

    $scope.getData = function () {
        var ngGridResourcePath = '/api/category/GetAll';

        $timeout(function () {
            $http.get(ngGridResourcePath).success(function (largeLoad) {
                $scope.myData = largeLoad;
            });
        }, 100);
    };

    $scope.getData();

    $scope.saveFromDialog = function (data) {
        if (data) {
            data.Id >= 0 ? updateCategory(data) : createCategory(data);
        }

        $scope.dialog.close();
    }

    $scope.deleteFromDialog = function (data) {
        if (data) {
            deleteCategory(data);
        }

        $scope.dialog.close();
    }

    var updateCategory = function (category) {
        $http.post('/api/category/update/', category).success(function () {$scope.getData();});
    }

    var deleteCategory = function (category) {
        $http.post('/api/category/Delete/', category.Id).success(function () { $scope.getData(); });
    }

    var createCategory = function (category) {
        $http.post('/api/category/create/', category).success(function () { $scope.getData(); });
    }

    var openDialog = function (templateId, data) {
        $scope.dialog = dialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: data
        });
    }

    $scope.createCategory = function () {
        var newItem = { Id: -1, Title: '', Description: '' };
        openDialog('InserOrUpdate.html', newItem);
    }

    $scope.deleteCategory = function () {
        if ($scope.gridOption.selectedItems.length <= 0) {
            return;
        }
        openDialog('DeleteConfirm.html', $scope.gridOption.selectedItems[0]);
    }

    $scope.updateCategory = function () {
        if ($scope.gridOption.selectedItems.length <= 0) {
            return;
        }
        openDialog('InserOrUpdate.html', $scope.gridOption.selectedItems[0]);
    }
}]);

app.controller('NewsController', ['$scope', '$http', '$timeout', '$state', 'ngDialog', function ($scope, $http, $timeout, $state,dialog) {
    $scope.totalServerItems = 0;

    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],  // page size options
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
        totalServerItems:'totalServerItems',
        columnDefs: [
            { field: 'Title', displayName: '标题' },
            { field: 'Content', displayName: '内容' }
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

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var ngGridResourcePath = '/api/news/GetAll';

        $timeout(function () {
            $http.get(ngGridResourcePath).success(function (largeLoad) {
                $scope.setPagingData(largeLoad, page, pageSize);
            });
        }, 100);
    };

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    var openDialog = function (templateId,data) {
        $scope.dialog = dialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope: $scope,
            data:data
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
            $state.go('newsdetail', { model: { Title: "", Content: "", Id: -1 } });
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

app.controller('NewsDetailsController', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
    $scope.model = $stateParams.model;

    $scope.cancel = function () { $state.go('news'); };

    $scope.save = function () {
        $scope.model.Content = tinymce.get('txtContent').getContent();
        if ($scope.model.Id <= 0) {
            $http.post('/api/news/create', $scope.model).success(function () { $state.go('news'); });
        } else {
            $http.post('/api/news/update', $scope.model).success(function () { $state.go('news'); });
        }        
    };
}]);

app.controller('ProductListController', ['$scope', '$http', '$timeout', '$state', 'ngDialog', function ($scope, $http, $timeout, $state, dialog) {
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],  // page size options
        pageSize: 12,              // default page size
        currentPage: 1                 // initial page
    };

    $scope.totalServerItems = 0;

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
        totalServerItems: 'totalServerItems',
        selectedItems: [],
        columnDefs: [
            { field: 'Title', displayName: '产品名称' },
            { field: 'Content', displayName: '产品介绍' }
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

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var ngGridResourcePath = '/api/product/GetAll';

        $timeout(function () {
            $http.get(ngGridResourcePath).success(function (largeLoad) {
                $scope.setPagingData(largeLoad, page, pageSize);
            });
        }, 100);
    };

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
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
            $state.go('productdetail', { model: { Title: "", Content: "", Id: -1 } });
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
            deleteData(data);
        }

        $scope.dialog.close();
    }

    var deleteData = function (model) {
        $http.post('/api/product/Delete', model.Id).success(function () {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        });
    }
}]);

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
