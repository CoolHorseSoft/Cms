app.controller('AppController', ['$scope', function ($scope) {
    "use strict";

    $scope.toggleUserBlock = function () {
        $scope.$broadcast('toggleUserBlock');
    };
} ]);

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

      $scope.menuItems = [
                           {
                               "text": "Main Navigation",
                               "heading": "true"
                           },
                           {
                               "text": "Dashboard",
                               "sref": "#",
                               "icon": "icon-speedometer",
                               "alert": "3",
                               "label": "label label-info",
                               "submenu": [
                                   { "text": "Dashboard v1", "sref": "#" },
                                   { "text": "Dashboard v2", "sref": "#" },
                                   { "text": "Dashboard v3", "sref": "#" }
                               ]
                           },
                           {
                               "text": "Widgets",
                               "sref": "#",
                               "icon": "icon-grid",
                               "alert": "30",
                               "label": "label label-success",
                               "translate": "sidebar.nav.WIDGETS"
                           },
                           {
                               "text": "Layouts",
                               "sref": "#",
                               "icon": "icon-layers",
                               "submenu": [
                                   { "text": "Horizontal Nav", "sref": "app-h.dashboard_v2" }
                               ]
                           },
                           {
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

  } ]);

app.controller('CategoryController', ['$scope', '$http', '$timeout', 'ngDialog', function ($scope, $http, $timeout, dialog) {

    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [3,250, 500, 1000],  // page size options
        pageSize: 12,              // default page size
        currentPage: 1                 // initial page
    };

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        rowHeight: 36,
        headerRowHeight: 38,
        multiSelect:false,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        selectedItems: []
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
        $timeout(function () {
            var largeLoad = [{
                "name": "Ether",
                "amount": 42,
                "status": "paid"
            }, {
                "name": "Alma",
                "amount": 43,
                "status": "pending"
            }, {
                "name": "Jared",
                "amount": 21,
                "status": "pending"
            }, {
                "name": "Moroni",
                "amount": 50,
                "status": "paid"
            }, {
                "name": "Tiancum",
                "amount": 47,
                "status": "pending"
            }, {
                "name": "Jacob",
                "amount": 27,
                "status": "paid"
            }, {
                "name": "Nephi",
                "amount": 29,
                "status": "pending"
            }];
            if (searchText) {
                var ft = searchText.toLowerCase();
                  
                var data = largeLoad.filter(function (item) {
                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                });
                $scope.setPagingData(data, page, pageSize);
            } else {
                $scope.setPagingData(largeLoad, page, pageSize);
            }
        }, 100);
    };


    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.openDialog = function (templateId) {
        dialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope:$scope
        });
    }
}]);

app.controller('NewsController', ['$scope', '$http', '$timeout', 'ngDialog', function ($scope, $http, $timeout, dialog) {

    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [3, 250, 500, 1000],  // page size options
        pageSize: 12,              // default page size
        currentPage: 1                 // initial page
    };

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        rowHeight: 36,
        headerRowHeight: 38,
        multiSelect: false,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        selectedItems: []
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
        $timeout(function () {
            var largeLoad = [{
                "Title": "TitleDemo TileDemo",
                "Author": "Ale",
                "LastUpdated": "2017-04-20"
            }, {
                "Title": "TitleDemo TileDemo",
                "Author": "Ale",
                "LastUpdated": "2017-04-20"
            }, {
                "Title": "TitleDemo TileDemo",
                "Author": "Ale",
                "LastUpdated": "2017-04-20"
            }, {
                "Title": "TitleDemo TileDemo",
                "Author": "Ale",
                "LastUpdated": "2017-04-20"
            }, {
                "Title": "TitleDemo TileDemo",
                "Author": "Ale",
                "LastUpdated": "2017-04-20"
            }, {
                "Title": "TitleDemo TileDemo",
                "Author": "Ale",
                "LastUpdated": "2017-04-20"
            }, {
                "Title": "TitleDemo TileDemo",
                "Author": "Ale",
                "LastUpdated": "2017-04-20"
            }];
            if (searchText) {
                var ft = searchText.toLowerCase();

                var data = largeLoad.filter(function (item) {
                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                });
                $scope.setPagingData(data, page, pageSize);
            } else {
                $scope.setPagingData(largeLoad, page, pageSize);
            }
        }, 100);
    };


    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.openDialog = function (templateId) {
        dialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope:$scope
        });
    }
} ]);

app.controller('ProductListController', ['$scope', '$http', '$timeout', 'ngDialog', function ($scope, $http, $timeout, dialog) {

    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [3, 250, 500, 1000],  // page size options
        pageSize: 12,              // default page size
        currentPage: 1                 // initial page
    };

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        rowHeight: 36,
        headerRowHeight: 38,
        multiSelect: false,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        selectedItems: []
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
        $timeout(function () {
            var largeLoad = [{
                "ProductName": "Product One",
                "Description": "Description Description Description Description",
                "LastUpdated": "2017-04-20"
            }, {
                "ProductName": "Product One",
                "Description": "Description Description Description Description",
                "LastUpdated": "2017-04-20"
            }, {
                "ProductName": "Product One",
                "Description": "Description Description Description Description",
                "LastUpdated": "2017-04-20"
            }, {
                "ProductName": "Product One",
                "Description": "Description Description Description Description",
                "LastUpdated": "2017-04-20"
            }, {
                "ProductName": "Product One",
                "Description": "Description Description Description Description",
                "LastUpdated": "2017-04-20"
            }];
            if (searchText) {
                var ft = searchText.toLowerCase();

                var data = largeLoad.filter(function (item) {
                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                });
                $scope.setPagingData(data, page, pageSize);
            } else {
                $scope.setPagingData(largeLoad, page, pageSize);
            }
        }, 100);
    };


    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.openDialog = function (templateId) {
        dialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    }

    $scope.openDetail = function () {
        window.location.href = "#/productdetail";
    }
} ]);

app.controller('ProductDetailController', ['$scope', '$http', '$timeout', 'ngDialog', function ($scope, $http, $timeout, dialog) {
} ]);