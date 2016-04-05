﻿'use strict';
angular.module('liverpoolApp')
    .controller('RegisterController', [
        'AccountFactory', 'Authentication', 'ValidationService', '$state',
        function (AccountFactory, Authentication, ValidationService, $state) {
            var vm = this;
            vm.registerForm = {
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                fullName: '',
                birthday: ''
            };

            vm.register = function() {
                AccountFactory.register(vm.registerForm)
                    .then(function() {
                        $state.go('emailSent');
                    });
            }

            vm.open = function() {
                vm.status.opened = true;
            };

            vm.status = {
                opened: false
            };

            vm.dateOptions = {
                formatYear: 'yyyy',
                startingDay: 1
            };
        }
    ]);