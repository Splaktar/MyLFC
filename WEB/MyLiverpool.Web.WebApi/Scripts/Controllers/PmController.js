﻿var PmController = function($scope, $stateParams, PmsFactory) {
    $scope.message = undefined;

    var init = function () {
        PmsFactory.getMessage($stateParams.id)
            .then(function (response) {
                $scope.message = response;
            },
                function (response) {
                    //$scope.f = "";
                });
    };

    init();
};

PmController.$inject = ['$scope', '$stateParams', 'PmsFactory'];