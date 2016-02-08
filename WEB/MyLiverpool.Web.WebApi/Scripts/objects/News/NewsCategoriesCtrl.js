﻿var NewsCategoriesCtrl = function ($scope, NewsFactory) {
    $scope.categories = [];

    var init = function () {
        NewsFactory.getCategories()
            .then(function (response) {
                $scope.categories = response;
            },
                function (response) {
                    //$scope.f = "";
                });
    };

    init();
};

NewsCategoriesCtrl.$inject = ['$scope', 'NewsFactory'];