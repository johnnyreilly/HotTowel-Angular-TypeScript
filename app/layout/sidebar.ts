declare module ng.route {
    //Extend ICurrentRoute to incorporate configRouteConfig
    interface ICurrentRoute extends configRouteConfig {
    }
}

(function () { 
    'use strict';
    
    var controllerId = 'sidebar';
    angular.module('app').controller(controllerId,
        ['$route', 'config', 'routes', sidebar]);

    function sidebar($route: ng.route.IRouteService, config: config, routes: configRoute[]) {
        var vm = this;

        vm.isCurrent = isCurrent;

        activate();

        function activate() { getNavRoutes(); }
        
        function getNavRoutes() {
            vm.navRoutes = routes.filter(function(r) {
                return (r.config.settings && r.config.settings.nav) ? true : false;
            }).sort(function(r1, r2) {
                return r1.config.settings.nav - r2.config.settings.nav;
            });
        }
        
        function isCurrent(route: configRoute) {
            if (!route.config.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.config.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    };
})();
