﻿'use strict';
angular.module('liverpoolApp')
    .factory('NewsCommentsFactory', [
        '$q', '$http', 'SessionService', '$stateParams',
        function($q, $http, SessionService, $stateParams) {
            return {
                add: function(comment) {
                    var result = $q.defer();

                    $http({
                            method: 'Post',
                            url: SessionService.apiUrl + '/api/NewsComment/',
                            data: comment,
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .success(function(response) {
                            result.resolve(response);
                        })
                        .error(function(response) {
                            result.reject(response);
                        });

                    return result.promise;
                },
                delete: function(id) {
                    var result = $q.defer();

                    $http({
                            method: 'DELETE',
                            url: SessionService.apiUrl + '/api/NewsComment/?id=' + id,
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .success(function(response) {
                            result.resolve(response);
                        })
                        .error(function(response) {
                            result.reject(response);
                        });

                    return result.promise;
                },
                edit: function(item) {
                    var result = $q.defer();

                    $http({
                            method: 'PUT',
                            url: SessionService.apiUrl + '/api/NewsComment/',
                            data: item,
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .success(function(response) {
                            result.resolve(response);
                        })
                        .error(function(response) {
                            result.reject(response);
                        });

                    return result.promise;
                },


            }
        }
    ]);