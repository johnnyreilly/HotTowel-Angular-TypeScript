interface bootstrapDialog {
    deleteDialog: (itemName: string) => ng.IPromise<any>;
    confirmationDialog: (title: string, msg: string, okText?: string, cancelText?: string) => ng.IPromise<any>;
}

interface bootstrapDialogOptions {
    title: string;
    message: string;
    okText: string;
    cancelText: string;
}

interface bootstrapDialogScope extends ng.IScope {
    title: string;
    message: string;
    okText: string;
    cancelText: string;
    ok: () => void;
    cancel: () => void;
}

(function () {
    'use strict';

    var bootstrapModule = angular.module('common.bootstrap', ['ui.bootstrap']);

    bootstrapModule.factory('bootstrap.dialog', ['$modal', '$templateCache', modalDialog]);

    function modalDialog($modal: ng.ui.bootstrap.IModalService, $templateCache: ng.ITemplateCacheService) {
        var service: bootstrapDialog = {
            deleteDialog: deleteDialog,
            confirmationDialog: confirmationDialog
        };

        $templateCache.put('modalDialog.tpl.html', 
            '<div>' +
            '    <div class="modal-header">' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-ng-click="cancel()">&times;</button>' +
            '        <h3>{{title}}</h3>' +
            '    </div>' +
            '    <div class="modal-body">' +
            '        <p>{{message}}</p>' +
            '    </div>' +
            '    <div class="modal-footer">' +
            '        <button class="btn btn-primary" data-ng-click="ok()">{{okText}}</button>' +
            '        <button class="btn btn-info" data-ng-click="cancel()">{{cancelText}}</button>' +
            '    </div>' +
            '</div>');

        return service;

        function deleteDialog(itemName: string) {
            var title = 'Confirm Delete';
            itemName = itemName || 'item';
            var msg = 'Delete ' + itemName + '?';

            return confirmationDialog(title, msg);
        }
        
        function confirmationDialog(title: string, msg: string, okText?: string, cancelText?: string) {

            var modalOptions = {
                templateUrl: 'modalDialog.tpl.html',
                controller: ModalInstance,
                keyboard: true,
                resolve: {
                    options: function () {
                        return {
                            title: title,
                            message: msg,
                            okText: okText,
                            cancelText: cancelText
                        };
                    }
                }
            };

            return $modal.open(modalOptions).result; 
        }
    }

    var ModalInstance = ['$scope', '$modalInstance', 'options',
        function ($scope: bootstrapDialogScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance, options: bootstrapDialogOptions) {
            $scope.title = options.title || 'Title';
            $scope.message = options.message || '';
            $scope.okText = options.okText || 'OK';
            $scope.cancelText = options.cancelText || 'Cancel';
            $scope.ok = function () { $modalInstance.close('ok'); };
            $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
        }];
})();