//Left menu menu start
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