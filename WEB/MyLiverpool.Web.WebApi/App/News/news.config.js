﻿'use strict';
angular.module('news.config',
    ['news.factory', 'news.ctrl'])
    .config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('news', {
                    url: '/news?page&categoryId&userName',
                    templateUrl: function(params) {
                         return '/app/news/views/list.html?page=' + params.page + '&categoryId=' + params.categoryId + '&userName=' + params.userName;
                    },
                    controller: 'NewsController',
                    controllerAs: 'vm',
                    resolve: {
                        $title: function () { return 'Новости'; }
                    },
                    ncyBreadcrumb: {
                        label: 'Новости {{vm.categoryId ? vm.newsItems[0].newsCategoryName : ""}}',
                        parent: 'home'
                    }
                })
                .state('newsInfo', {
                    url: '/newsInfo?id',
                    views: {
                        "@": {
                            templateUrl: function (params) { return '/app/news/views/info.html?id=' + params.id; },
                            controller: 'NewsController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        $title: function () { return 'Название новости'; }
                    },
                    ncyBreadcrumb: {
                        label:  '{{vm.item.title}}',
                        parent: 'news'
                    }
                })
                .state('newsEdit', {
                    url: '/newsEdit?id',
                    views: {
                        '': {
                            templateUrl: function (params) { return '/app/news/views/Edit.html?id=' + params.id; },
                            controller: 'NewsController',
                            controllerAs: 'vm'
                        },
                        'files@newsEdit': {
                            templateUrl: '/app/image/views/add.html',
                            controller: 'ImageCtrl',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        $title: function () { return 'Редактирование новости'; }
                    },
                    ncyBreadcrumb: {
                        label: 'Редактирование новости',
                        parent: 'news'
                    }
                });
        }
    ]);