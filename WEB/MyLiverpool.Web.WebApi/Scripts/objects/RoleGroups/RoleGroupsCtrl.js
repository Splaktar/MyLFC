﻿var RoleGroupsCtrl = function ($scope, $stateParams, $state, RoleGroupsFactory) {
    //$scope.users = [];
    //$scope.pageNo = 1;
    //$scope.countPage = 1;
    //var init = function (page) {
    //    UsersFactory.getUsers(page)
    //        .then(function (response) {
    //            $scope.users = response.list;
    //            $scope.pageNo = response.pageNo;
    //            $scope.countPage = response.CountPage;
    //        },
    //            function (response) {
    //                //$scope.f = "";
    //            });
    //};

    //$scope.isNotSelf = function (userId, userId2) {
    //    return userId != userId2;
    //}

    //$scope.goToPage = function () {
    //    $state.go('users', { page: $scope.pageNo });
    //}
    
    //init($stateParams.page);
};

RoleGroupsCtrl.$inject = ['$scope', '$stateParams', '$state', 'RoleGroupsFactory'];