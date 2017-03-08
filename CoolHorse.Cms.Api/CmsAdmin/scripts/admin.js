﻿(function ($, window, document) {

    var containers = {},
        messages = {},

        notify = function (options) {

            if ($.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) == 'string' ? { status: arguments[1] } : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll = function (group, instantly) {
            if (group) {
                for (var id in messages) { if (group === messages[id].group) messages[id].close(instantly); }
            } else {
                for (var id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function (options) {

        var $this = this;

        this.options = $.extend({}, Message.defaults, options);

        this.uuid = "ID" + (new Date().getTime()) + "RAND" + (Math.ceil(Math.random() * 100000));
        this.element = $([
            // @geedmo: alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>' + this.options.message + '</div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        // status
        if (this.options.status) {
            this.element.addClass('alert alert-' + this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if (!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-' + this.options.pos + '"></div>').appendTo('body').on("click", ".uk-notify-message", function () {
                $(this).data("notifyMessage").close();
            });
        }
    };


    $.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function () {

            if (this.element.is(":visible")) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

            this.element.css({ "opacity": 0, "margin-top": -1 * this.element.outerHeight(), "margin-bottom": 0 }).animate({ "opacity": 1, "margin-top": 0, "margin-bottom": marginbottom }, function () {

                if ($this.options.timeout) {

                    var closefn = function () { $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function () { clearTimeout($this.timeout); },
                        function () { $this.timeout = setTimeout(closefn, $this.options.timeout); }
                    );
                }

            });

            return this;
        },

        close: function (instantly) {

            var $this = this,
                finalize = function () {
                    $this.element.remove();

                    if (!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    delete messages[$this.uuid];
                };

            if (this.timeout) clearTimeout(this.timeout);

            if (instantly) {
                finalize();
            } else {
                this.element.animate({ "opacity": 0, "margin-top": -1 * this.element.outerHeight(), "margin-bottom": 0 }, function () {
                    finalize();
                });
            }
        },

        content: function (html) {

            var container = this.element.find(">div");

            if (!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function (status) {

            if (!status) {
                return this.currentstatus;
            }

            this.element.removeClass('alert alert-' + this.currentstatus).addClass('alert alert-' + status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "normal",
        timeout: 5000,
        group: null,
        pos: 'top-center'
    };


    $["notify"] = notify;
    $["notify"].message = Message;
    $["notify"].closeAll = closeAll;

    return notify;

}(jQuery, window, document));

//ui.router  Provide route services
//ui.bootstrap Provide the collapse directive
var app = angular.module('admin', ['ui.router','ui.bootstrap', 'ngDialog', 'ngGrid']);

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

app.service('dataService', ['$http', function ($http) {
    return {
        getResources: function (uri, success, error) {
            $http.get(uri).success(success ? success : function () { }).error(error ? error : function () { });
        },
        updateResources: function (uri, params, success, error) {
            $http.post(uri, params).success(success ? success : function () { }).error(error ? error : function () { });
        }
    };
}
]);

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

app.controller('SidebarController', ['$rootScope', '$scope', '$state', 'Utils',
  function ($rootScope, $scope, $state, utils) {

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

app.controller('CategoryController', ['$scope', '$http', '$timeout', 'ngDialog', 'dataService', function ($scope, $http, $timeout, ngDialog, dataService) {
    var getData = function () {
        dataService.getResources('/api/category/GetAll', function (data) { $scope.myData = data.Response; });
    }

    var openDialog = function (templateId, data) {
        ngDialog.open({
            template: templateId,
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: data,
            closeByEscape: false,
            closeByDocument: false
        });
    }

    var callBackForUpdate = function (data) {
        if (data.ErrorMessage && data.ErrorMessage !== "") {
            $.notify(data.ErrorMessage, { status: 'danger', pos: 'top-center',timeout:500 });
            return false;
        }

        return true;
    }

    getData();

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

    $scope.openDialog = function (operationType) {
        if (operationType === 1) {
            var newItem = { Id: -1, Title: '', Description: '' };
            openDialog('InserOrUpdate.html', newItem);
            return;
        }

        if (operationType === 2) {
            if ($scope.gridOption.selectedItems.length <= 0) {
                return;
            }
            openDialog('InserOrUpdate.html', $scope.gridOption.selectedItems[0]);
        }

        if (operationType === 3) {
            if ($scope.gridOption.selectedItems.length <= 0) {
                return;
            }
            openDialog('DeleteConfirm.html', $scope.gridOption.selectedItems[0]);
        }
    }

    $scope.saveFromDialog = function (data, operationType) {
        if ($('#form').length > 0 && !$('#form').valid()) {
            return false;
        }
        if ((operationType !== 3) && data) {
            data.Id >= 0
                ? dataService.updateResources('/api/category/update/', data, function (response) {
                    if (callBackForUpdate(response)) {
                        getData();
                        ngDialog.closeAll();
                    }
                    return false;
                })
                : dataService.updateResources('/api/category/create/', data, function (response) {
                    if (callBackForUpdate(response)) {
                        getData();
                        ngDialog.closeAll();
                    }
                    return false;
                });
        }

        if (operationType === 3 && data) {
            dataService.updateResources('/api/category/Delete/', data.Id, function () {
                getData();
                ngDialog.closeAll();
            });
        }
    }

    $scope.$on('ngDialog.opened', function (e, $dialog) {
        if ($('#form').length > 0) {
            $('#form').validate({
                errorClass: 'text-danger',
                rules: {
                    txtCategoryTitle: {
                        required: true,
                        maxlength: 12
                    }
                },
                messages: {
                    txtCategoryTitle: {
                        required: "请输入类别标题",
                        maxlength: "标题长度不能大于12个字符"
                    }
                }
            });
        }
    });
}]);

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

app.controller('NewsDetailsController', ['$scope', '$http', '$state', '$stateParams', 'dataService', function ($scope, $http, $state, $stateParams, dataService) {
    $scope.availableCategories = [];
    dataService.getResources('/api/category/GetAll', function (data) {
        $scope.availableCategories.push({ Id: -1, Title: '-请选择类别-' });
        $scope.availableCategories = $scope.availableCategories.concat(data.Response);
        $scope.selectedCategory = -1;
    });

    $scope.model = $stateParams.model;

    $scope.cancel = function () { $state.go('news'); };

    $scope.save = function () {
        tinymce.activeEditor.save();

        if (!$('#newsEditForm').valid()) {
            return false;
        }
        $scope.model.Content = tinymce.activeEditor.getContent();
        if ($scope.model.Id <= 0) {
            $http.post('/api/news/create', $scope.model).success(function () { $state.go('news'); });
        } else {
            $http.post('/api/news/update', $scope.model).success(function () { $state.go('news'); });
        }
    };

    $.validator.addMethod('selectRequired',
        function (value, element, params) {
            if ($(element).val() < 0) {
                return false;
            }
            return true;
        },
        "请选择类别");

    $.validator.addMethod('editorRequired',
        function (value, element, params) {
            if ($(element).val() === "") {
                return false;
            }
            return true;
        },
        "请输入文章内容或从模板中选择一个合适的模板进行编辑");

    $(document).ready(function(){
        $('#newsEditForm').validate({
            errorClass: 'text-danger',
            ignore:[],
            rules: {
                optCategory: {
                    selectRequired: true
                },
                txtContent: {
                    editorRequired: true
                }
            }
        });
    });
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