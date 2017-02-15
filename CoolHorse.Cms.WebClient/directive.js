//var cmsApp = angular.module("cmsAdmin");

cmsApp.directive('toggleFullscreen', function () {
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

cmsApp.directive('searchOpen', ['navSearch', function (navSearch) {
    'use strict';

    return {
        restrict: 'A',
        controller: ["$scope", "$element", function ($scope, $element) {
            $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
        } ]
    };

} ]).directive('searchDismiss', ['navSearch', function (navSearch) {
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
        } ]
    };

} ]);

cmsApp.directive("triggerResize", ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                $timeout(function () {
                    $window.dispatchEvent(new Event('resize'))
                });
            });
        }
    };
} ]);

cmsApp.directive('toggleState', ['toggleStateService', function (toggle) {
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

} ]);