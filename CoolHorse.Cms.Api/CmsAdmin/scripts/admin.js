//ui.router  Provide route services
//ui.bootstrap Provide the collapse directive
var app = angular.module('admin', ['ui.router', 'ngGrid']);

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

//Router configuration start
app.provider('RouteHelpers', function () {
    "use strict";

    // Set here the base of the relative path
    // for all app views
    this.basepath = function (uri) {
        return 'pages/' + uri;
    };

    this.$get = function () {
        return {
            basepath: this.basepath
        }
    };
});

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
    'use strict';

    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise('/category');

    // 
    // Application Routes
    // -----------------------------------   
    $stateProvider
    .state('app', {
        url: '/app',
        templateUrl: helper.basepath('app.htm')
    }).state('category', {
        url: '/category',
        controller: 'CategoryController',
        templateUrl: helper.basepath('category.htm')
    }).state('news', {
        url: '/news',
        controller: 'NewsController',
        templateUrl: helper.basepath('newslist.htm')
    }).state('newsdetail', {
        url: '/newsdetail',
        controller: 'NewsDetailsController',
        templateUrl: helper.basepath('newsdetail.htm'),
        params: { model: null }
    }).state('productlist', {
        url: '/productlist',
        controller: 'ProductListController',
        templateUrl: helper.basepath('productlist.htm')
    }).state('productdetail', {
        url: '/productdetail',
        controller: 'ProductDetailController',
        templateUrl: helper.basepath('productdetail.htm'),
        params: { model: null }
    });
}]);
//Router configuration end

//Search button start
app.service('navSearch', function () {
    var navbarFormSelector = 'form.navbar-form';
    return {
        toggle: function () {

            var navbarForm = $(navbarFormSelector);

            navbarForm.toggleClass('open');

            var isOpen = navbarForm.hasClass('open');

            navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

        },

        dismiss: function () {
            $(navbarFormSelector)
              .removeClass('open')      // Close control
              .find('input[type="text"]').blur() // remove focus
              .val('')                    // Empty input
            ;
        }
    };

});

app.directive('searchOpen', ['navSearch', function (navSearch) {
    'use strict';

    return {
        restrict: 'A',
        controller: ["$scope", "$element", function ($scope, $element) {
            $element
              .on('click', function (e) { e.stopPropagation(); })
              .on('click', navSearch.toggle);
        }]
    };

}]).directive('searchDismiss', ['navSearch', function (navSearch) {
    'use strict';

    var inputSelector = '.navbar-form input[type="text"]';

    return {
        restrict: 'A',
        controller: ["$scope", "$element", function ($scope, $element) {

            $(inputSelector)
              .on('click', function (e) { e.stopPropagation(); })
              .on('keyup', function (e) {
                  if (e.keyCode == 27) // ESC
                      navSearch.dismiss();
              });

            // click anywhere closes the search
            $(document).on('click', navSearch.dismiss);
            // dismissable options
            $element
              .on('click', function (e) { e.stopPropagation(); })
              .on('click', navSearch.dismiss);
        }]
    };

}]);

//Search button end

//Toggele right settings menu start
app.service('toggleStateService', ['$rootScope', function ($rootScope) {

    var storageKeyName = 'toggleState';

    // Helper object to check for words in a phrase //
    var WordChecker = {
        hasWord: function (phrase, word) {
            return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
        },
        addWord: function (phrase, word) {
            if (!this.hasWord(phrase, word)) {
                return (phrase + (phrase ? ' ' : '') + word);
            }
        },
        removeWord: function (phrase, word) {
            if (this.hasWord(phrase, word)) {
                return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
            }
        }
    };

    // Return service public methods
    return {
        // Add a state to the browser storage to be restored later
        addState: function (classname) {
            var data = angular.fromJson($rootScope.$storage[storageKeyName]);

            if (!data) {
                data = classname;
            }
            else {
                data = WordChecker.addWord(data, classname);
            }

            $rootScope.$storage[storageKeyName] = angular.toJson(data);
        },

        // Remove a state from the browser storage
        removeState: function (classname) {
            var data = $rootScope.$storage[storageKeyName];
            // nothing to remove
            if (!data) return;

            data = WordChecker.removeWord(data, classname);

            $rootScope.$storage[storageKeyName] = angular.toJson(data);
        },

        // Load the state string and restore the classlist
        restoreState: function ($elem) {
            var data = angular.fromJson($rootScope.$storage[storageKeyName]);

            // nothing to restore
            if (!data) return;
            $elem.addClass(data);
        }

    };

}]);

app.directive('toggleState', ['toggleStateService', function (toggle) {
    'use strict';

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var $body = $('body');

            $(element)
              .on('click', function (e) {
                  e.preventDefault();
                  var classname = attrs.toggleState;

                  if (classname) {
                      if ($body.hasClass(classname)) {
                          $body.removeClass(classname);
                          if (!attrs.noPersist)
                              toggle.removeState(classname);
                      }
                      else {
                          $body.addClass(classname);
                          if (!attrs.noPersist)
                              toggle.addState(classname);
                      }

                  }

              });
        }
    };

}]);
//Toggele right settings menu end

//Left menu menu start
app.constant('APP_MEDIAQUERY',
{
    'desktopLG': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});

app.service('Utils', ["$window", "APP_MEDIAQUERY", function ($window, APP_MEDIAQUERY) {
    'use strict';

    var $html = angular.element("html"),
        $win = angular.element($window),
        $body = angular.element('body');

    return {
        // DETECTION
        support: {
            transition: (function () {
                var transitionEnd = (function () {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
            animation: (function () {

                var animationEnd = (function () {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function (callback) { window.setTimeout(callback, 1000 / 60); },
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch) ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
        },
        // UTILITIES
        isInView: function (element, options) {

            var $element = $(element);

            if (!$element.is(':visible')) {
                return false;
            }

            var window_left = $win.scrollLeft(),
                window_top = $win.scrollTop(),
                offset = $element.offset(),
                left = offset.left,
                top = offset.top;

            options = $.extend({ topoffset: 0, leftoffset: 0 }, options);

            if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
            } else {
                return false;
            }
        },
        langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
        isTouch: function () {
            return $html.hasClass('touch');
        },
        isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
        },
        isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
        },
        isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
        }
    };
}]);

app.directive('sidebar', ['$rootScope', '$window', 'Utils', function ($rootScope, $window, Utils) {

    var $win = $($window);
    var $body = $('body');
    var $scope;
    var $sidebar;
    var currentState = $rootScope.$state.current.name;

    return {
        restrict: 'EA',
        template: '<nav class="sidebar" ng-transclude></nav>',
        transclude: true,
        replace: true,
        link: function (scope, element, attrs) {

            $scope = scope;
            $sidebar = element;

            var eventName = Utils.isTouch() ? 'click' : 'mouseenter';
            var subNav = $();
            $sidebar.on(eventName, '.nav > li', function () {

                if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {

                    subNav.trigger('mouseleave');
                    subNav = toggleMenuItem($(this));

                    // Used to detect click and touch events outside the sidebar          
                    sidebarAddBackdrop();

                }

            });

            scope.$on('closeSidebarMenu', function () {
                removeFloatingNav();
            });

            // Normalize state when resize to mobile
            $win.on('resize', function () {
                if (!Utils.isMobile())
                    $body.removeClass('aside-toggled');
            });

            // Adjustment on route changes
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                currentState = toState.name;
                // Hide sidebar automatically on mobile
                $('body.aside-toggled').removeClass('aside-toggled');

                $rootScope.$broadcast('closeSidebarMenu');
            });

            // Allows to close
            if (angular.isDefined(attrs.sidebarAnyclickClose)) {

                $('.wrapper').on('click.sidebar', function (e) {
                    // don't check if sidebar not visible
                    if (!$body.hasClass('aside-toggled')) return;

                    // if not child of sidebar
                    if (!$(e.target).parents('.aside').length) {
                        $body.removeClass('aside-toggled');
                    }

                });
            }

        }
    };

    function sidebarAddBackdrop() {
        var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop' });
        $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
            removeFloatingNav();
        });
    }

    // Open the collapse sidebar submenu items when on touch devices 
    // - desktop only opens on hover
    function toggleTouchItem($element) {
        $element
          .siblings('li')
          .removeClass('open')
          .end()
          .toggleClass('open');
    }

    // Handles hover to open items under collapsed menu
    // ----------------------------------- 
    function toggleMenuItem($listItem) {

        removeFloatingNav();

        var ul = $listItem.children('ul');

        if (!ul.length) return $();
        if ($listItem.hasClass('open')) {
            toggleTouchItem($listItem);
            return $();
        }

        var $aside = $('.aside');
        var $asideInner = $('.aside-inner'); // for top offset calculation
        // float aside uses extra padding on aside
        var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
        var subNav = ul.clone().appendTo($aside);

        toggleTouchItem($listItem);

        var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
        var vwHeight = $win.height();

        subNav
          .addClass('nav-floating')
          .css({
              position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
              top: itemTop,
              bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
          });

        subNav.on('mouseleave', function () {
            toggleTouchItem($listItem);
            subNav.remove();
        });

        return subNav;
    }

    function removeFloatingNav() {
        $('.dropdown-backdrop').remove();
        $('.sidebar-subnav.nav-floating').remove();
        $('.sidebar li.open').removeClass('open');
    }

}]);
//Left menu menu end

//Controllers start
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

app.controller('SidebarController', ['$rootScope', '$scope', '$state','Utils',
  function ($rootScope, $scope, $state,utils) {

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
                               "icon": "fa fa-reorder"
                           },
                           {
                               "text": "新闻管理",
                               "heading": "true"
                           },
                           {
                               "text": "新闻列表",
                               "sref": "news",
                               "icon": "fa fa-newspaper-o"
                           },
                           {
                               "text": "产品管理",
                               "heading": "true"
                           },
                           {
                               "text": "产品列表",
                               "sref": "productlist",
                               "icon": "fa fa-photo"
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

app.controller('CategoryController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
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
        if (!$('#form').valid()) {
            return false;
        }
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
        $http.post('/api/category/update/', category).success(function () { $scope.getData(); });
    }

    var deleteCategory = function (category) {
        $http.post('/api/category/Delete/', category.Id).success(function () { $scope.getData(); });
    }

    var createCategory = function (category) {
        $http.post('/api/category/create/', category).success(function () { $scope.getData(); });
    }

    var openDialog = function (templateId, data) {
        $('#form').modal({
            backdrop: "static",
            keyboard: false,
            show: true
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

    $(document).ready(function () {
        //$('#form').validate({
        //    rules: {
        //        categoryTitle: { required: true }
        //    }
        //});
    });
}]);

app.controller('NewsController', ['$scope', '$http', '$timeout', '$state', 'ngDialog', function ($scope, $http, $timeout, $state, dialog) {
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
        pageSizes: [5, 10, 20],  // page size options
        pageSize: 5,              // default page size
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
        //totalServerItems: 'totalServerItems',
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

    $scope.getPagedDataAsync = function (pageSize, page) {
        var ngGridResourcePath = '/api/product/GetAll';

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
//Controllers end