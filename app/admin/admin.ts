interface adminVm {
    title: string;
}

(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['common', admin]);

    function admin(common: common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm: adminVm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
        }
    }
})();