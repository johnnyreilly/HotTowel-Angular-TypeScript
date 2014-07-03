(function () {
    'use strict';

    var app = angular.module('app', [
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'common',
        'common.bootstrap',
        'ui.bootstrap'
    ]);

    // Handle routing errors and success events
    app.run([
        '$route', function ($route) {
            // Include $route to kick start the router.
        }]);
})();
//# sourceMappingURL=app.js.map
