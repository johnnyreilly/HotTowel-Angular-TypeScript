interface spinner {
    spinnerHide: () => void;
    spinnerShow: () => void;
}

(function () {
    'use strict';

    // Must configure the common service and set its 
    // events via the commonConfigProvider

    angular.module('common')
        .factory('spinner', ['common', 'commonConfig', spinner]);

    function spinner(common: common, commonConfig: commonConfig) {
        var service: spinner = {
            spinnerHide: spinnerHide,
            spinnerShow: spinnerShow
        };

        return service;

        function spinnerHide() { spinnerToggle(false); }

        function spinnerShow() { spinnerToggle(true); }

        function spinnerToggle(show: boolean) {
            common.$broadcast(commonConfig.config.spinnerToggleEvent, { show: show });
        }
    }
})();