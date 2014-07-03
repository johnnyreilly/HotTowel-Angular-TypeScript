interface loggerFunction {
    (message: string, data: Object, source: string, showToast: boolean): void;
}

interface logger {
    [fnName: string]: any;
    getLogFn(moduleId: string, fnName?: string): (message: string, data?: Object, showToast?: boolean) => void;
    log: loggerFunction;
    logError: loggerFunction;
    logSuccess: loggerFunction;
    logWarning: loggerFunction;
}

(function () {
    'use strict';
    
    angular.module('common').factory('logger', ['$log', logger]);

    function logger($log: ng.ILogService) {
        var service: logger = {
            getLogFn: getLogFn,
            log: log,
            logError: logError,
            logSuccess: logSuccess,
            logWarning: logWarning
        };

        return service;

        function getLogFn(moduleId: string, fnName: string) {
            fnName = fnName || 'log';
            switch (fnName.toLowerCase()) { // convert aliases
                case 'success':
                    fnName = 'logSuccess'; break;
                case 'error':
                    fnName = 'logError'; break;
                case 'warn':
                    fnName = 'logWarning'; break;
                case 'warning':
                    fnName = 'logWarning'; break;
            }

            var logFn: loggerFunction = service[fnName] || service.log;
            return function (msg: string, data: Object, showToast: boolean) {
                logFn(msg, data, moduleId, (showToast === undefined) ? true : showToast);
            };
        }

        function log(message: string, data: Object, source: string, showToast: boolean) {
            logIt(message, data, source, showToast, 'info');
        }

        function logWarning(message: string, data: Object, source: string, showToast: boolean) {
            logIt(message, data, source, showToast, 'warning');
        }

        function logSuccess(message: string, data: Object, source: string, showToast: boolean) {
            logIt(message, data, source, showToast, 'success');
        }

        function logError(message: string, data: Object, source: string, showToast: boolean) {
            logIt(message, data, source, showToast, 'error');
        }

        function logIt(message: string, data: Object, source: string, showToast: boolean, toastType: string) {
            var write = (toastType === 'error') ? $log.error : $log.log;
            source = source ? '[' + source + '] ' : '';
            write(source, message, data);
            if (showToast) {
                if (toastType === 'error') {
                    toastr.error(message);
                } else if (toastType === 'warning') {
                    toastr.warning(message);
                } else if (toastType === 'success') {
                    toastr.success(message);
                } else {
                    toastr.info(message);
                }
            }
        }
    }
})();