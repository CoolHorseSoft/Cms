//ui.router  Provide route services
//ui.bootstrap Provide the collapse directive
var app = angular.module('admin', ['ui.router', 'oc.lazyLoad','ui.bootstrap']);

app.run(["$rootScope", "$state", '$templateCache', function ($rootScope, $state, $templateCache) {
    $rootScope.$state = $state;
    $rootScope.$templateCache = $templateCache;

    $rootScope.app = {
        year: ((new Date()).getFullYear()),
        name: "CoolHorse Soft Co.,Ltd",
        layout: {
            isCollapsed: false,
            isBoxed: false,
            isFixed: true,
            isFloat: false,
            asideHover: false,
            theme: null
        }
    }

    $rootScope.user = {
        name: 'Alexandre',
        job: 'tester',
        picture: 'images/01.jpg'
    };
}]);

app.run(["$rootScope", function ($rootScope) {
    $rootScope.userBlockVisible = false;

    $rootScope.toggleUserBlock = function () {
        $rootScope.userBlockVisible = !$rootScope.userBlockVisible;
    };
}]);

app.run(["$rootScope", "$state", '$templateCache', 'Utils', 'APP_MENU', function ($rootScope, $state, $templateCache, utils, appMenu) {
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

    $rootScope.getMenuItemPropClasses = function (item) {
        return (item.heading ? 'nav-heading' : '') +
               (isActive(item) ? ' active' : '');
    };

    $rootScope.menuItems = appMenu;

    // Handle sidebar collapse items
    // ----------------------------------- 

    $rootScope.addCollapse = function ($index, item) {
        collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $rootScope.isCollapse = function ($index) {
        return (collapseList[$index]);
    };

    $rootScope.toggleCollapse = function ($index, isParentItem) {


        // collapsed sidebar doesn't toggle drodopwn
        if (utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

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

        $rootScope.lastEventFromChild = isChild($index);

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

app.run(["$rootScope", function ($rootScope) {
    $rootScope.pagingOptions = {
        pageSizes: [5, 10, 20],  // page size options
        pageSize: 5,              // default page size
        currentPage: 1                 // initial page
    };

    $rootScope.defaultGridOptions = {
        data: 'myData',        
        rowHeight: 36,
        headerRowHeight: 38,
        multiSelect: false,
        pagingOptions: $rootScope.pagingOptions,
        keepLastSelected: false,
        showSelectionCheckbox: true,
        selectedItems: []
    };

    $rootScope.setPagingData = function (data, page, pageSize,scope) {
        // calc for pager
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        // Store data from server
        scope.myData = pagedData;
        // Update server side data length
        scope.totalServerItems = data.length;

        if (!scope.$$phase) {
            scope.$apply();
        }

    };
}]);

app.run(["$rootScope", function ($rootScope) {
    $rootScope.openDialog = function (templateId, data, scope,dialog) {
        scope.dialog = dialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope: scope,
            data: data
        });
    }
}]);