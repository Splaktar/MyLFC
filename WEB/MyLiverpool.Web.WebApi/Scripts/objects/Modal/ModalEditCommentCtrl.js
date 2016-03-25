﻿'use strict';
angular.module('liverpoolApp')
    .controller('ModalEditCommentCtrl', [
        '$scope', '$uibModalInstance', 'editingComment', 'Authentication',
        function($scope, $uibModalInstance, editingComment, Authentication) {
            $scope.editingComment = editingComment;
            $scope.oldMessage = editingComment.message;
            $scope.oldAnswer = editingComment.answer;

            $scope.ok = function() {
                $uibModalInstance.close(editingComment);
            };

            $scope.cancel = function() {
                $scope.editingComment.message = $scope.oldMessage;
                $scope.editingComment.answer = $scope.oldAnswer;
                $uibModalInstance.dismiss('cancel');
            };

            $scope.isModerator = function() {
                return Authentication.isModerator();
            }
        }
    ]);