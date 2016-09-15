﻿'use strict';
angular.module('match.factory', [])
    .factory('MatchFactory', [
        '$q', '$http', 'SessionService',
        function ($q, $http, SessionService) {
            var controllerUrl = SessionService.apiUrl + '/api/match';
            return {
                get: function (id) {
                    var result = $q.defer();

                    $http({
                        method: 'GET',
                        url: controllerUrl + '?id=' + id,
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .success(function (response) {
                            result.resolve(response);
                        })
                        .error(function (response) {
                            result.reject(response);
                        });

                    return result.promise;
                },
                getList: function () {
                    var result = $q.defer();

                    $http({
                        method: 'GET',
                        url: controllerUrl + '/list',
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .success(function (response) {
                            result.resolve(response);
                        })
                        .error(function (response) {
                            result.reject(response);
                        });

                    return result.promise;
                },
                getTypes: function () {
                    var result = $q.defer();

                    $http({
                        method: 'GET',
                        url: controllerUrl + '/getTypes',
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .success(function (response) {
                            result.resolve(response);
                        })
                        .error(function (response) {
                            result.reject(response);
                        });

                    return result.promise;
                },
                create: function (model) {
                    var result = $q.defer();
                    $http({
                        method: 'POST',
                        url: controllerUrl,
                        data: model,
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .success(function (response) {
                            result.resolve(response);
                        })
                        .error(function (response) {
                            result.reject(response);
                        });
                    return result.promise;
                },
                edit: function (model) {
                    var result = $q.defer();
                    $http({
                        method: 'PUT',
                        url: controllerUrl,
                        data: model,
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .success(function (response) {
                            result.resolve(response);
                        })
                        .error(function (response) {
                            result.reject(response);
                        });
                    return result.promise;
                },
                delete: function (id) {
                    var result = $q.defer();
                    $http({
                        method: 'DELETE',
                        url: controllerUrl + '?id=' + id,
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .success(function (response) {
                            result.resolve(response);
                        })
                        .error(function (response) {
                            result.reject(response);
                        });
                    return result.promise;
                }

            };
        }
    ]);