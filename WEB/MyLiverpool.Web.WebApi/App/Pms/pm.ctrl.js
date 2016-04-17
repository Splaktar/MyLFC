﻿'use strict';
angular.module('pms.ctrl', [])
    .controller('PmController', [
        '$stateParams', 'PmsFactory',
        function($stateParams, PmsFactory) {
            var vm = this;
            vm.message = undefined;

            vm.init = function() {
                PmsFactory.getMessage($stateParams.id)
                    .then(function(response) {
                            vm.message = response;
                        },
                        function(response) {
                            //.f = "";
                        });
            };
        }
    ]);