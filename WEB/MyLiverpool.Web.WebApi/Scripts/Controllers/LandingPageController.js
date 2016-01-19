﻿var LandingPageController = function ($scope, $state, Authentication, RouteFilter, AccountFactory, $location) { //SessionService,
    $scope.userId = function() {
        return Authentication.getUserId();
    };

    $scope.navbarProperties = {
        isCollapsed: true
    };

    
    $scope.loggedIn = function () {
        return (Authentication.getUser());
    }


    $scope.canAccess = function(route) 
             { 
                     return RouteFilter.canAccess(route); 
                 } 

    $scope.logout = function() {
        Authentication.logout();
        //$state.go('home');
    }

    $scope.emailUnique = function (email) {
        return AccountFactory.isEmailUnique(email);
    }

    $scope.userNameUnique = function (userName) {
        return AccountFactory.isUserNameUnique(userName);
    }

    $scope.getReturnUrl = function () {
      //  console.log($location.url());
        return $location.url();
    }
    
    $scope.isNewsmaker = function () {
     //   console.log('isNewsmaker landing ' + Authentication.isNewsmaker());
        return Authentication.isNewsmaker();
    }

    $scope.isEditor = function () {
     //   console.log('isEditor landing');
        return Authentication.isEditor();
    }

    $scope.isModerator = function () {
    //    console.log('isModerator landing');
        return Authentication.isModerator();
    }
}

// The $inject property of every controller (and pretty much every other type of object in Angular) needs to be a string array equal to the controllers arguments, only as strings
LandingPageController.$inject = ['$scope', '$state', 'Authentication', 'RouteFilter', 'AccountFactory', '$location']; //'SessionService',