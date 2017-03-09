//ui.router  Provide route services
//ui.bootstrap Provide the collapse directive
var app = angular.module('admin', ['ui.router', 'oc.lazyLoad','ui.bootstrap']);

app.run(["$rootScope", "$state", '$templateCache', 'Utils', 'APP_MENU', function ($rootScope, $state, $templateCache, utils, APP_MENU) {
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

    $rootScope.userBlockVisible = false;

    $rootScope.toggleUserBlock = function () {
        $rootScope.userBlockVisible = !$rootScope.userBlockVisible;
    };


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

    $rootScope.menuItems = APP_MENU;

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