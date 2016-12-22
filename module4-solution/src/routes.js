(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/home.template.html'
      })
      .state('categories', {
        url: '/categories',
        template: '<categories list="ctrl.categories"></categories>',
        controller: function (categories) {
          this.categories = categories;
        },
        controllerAs: 'ctrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        template: '<items list="ctrl.items"></items>',
        controller: function (items) {
          this.items = items;
        },
        controllerAs: 'ctrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
  }
})();