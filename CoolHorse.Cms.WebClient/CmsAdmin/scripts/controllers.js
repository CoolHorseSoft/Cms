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