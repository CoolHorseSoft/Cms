﻿app.directive('searchOpen', ['navSearch', function (navSearch) {
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


app.directive('toggleFullscreen', function () {
    'use strict';

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {

                    screenfull.toggle();

                    // Switch icon indicator
                    if (screenfull.isFullscreen)
                        $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                    else
                        $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                    $.error('Fullscreen not enabled');
                }

            });
        }
    };

});


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