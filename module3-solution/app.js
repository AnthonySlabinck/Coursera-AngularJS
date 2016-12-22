(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.template.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    function ItemsLoaderIndicatorDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                showItemsLoaderIndicator: '<'
            },
            link: ItemsLoaderIndicatorDirectiveLink
        };

        return ddo;
    }

    function ItemsLoaderIndicatorDirectiveLink(scope, element, attrs, controller) {
        scope.$watch('showItemsLoaderIndicator', function (newValue, oldValue) {
            if (newValue === true) {
                showItemsLoaderIndicator();
            } else {
                hideItemsLoaderIndicator();
            }
        });

        function showItemsLoaderIndicator() {
            element.find("div").css('display', 'block');
        }

        function hideItemsLoaderIndicator() {
            element.find("div").css('display', 'none');
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var vm = this;

        vm.searchTerm = "";
        vm.found = [];
        vm.showItemsLoaderIndicator = false;

        vm.narrowItDown = function () {
            vm.showItemsLoaderIndicator = true;
            if (vm.searchTerm) {
                MenuSearchService.getMatchedMenuItems(vm.searchTerm).then(function (result) {
                    vm.found = result;
                    vm.showItemsLoaderIndicator = false;
                });
            } else {
                vm.found = [];
                vm.showItemsLoaderIndicator = false;
            }
        }

        vm.removeItem = function (itemIndex) {
            vm.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http.get(ApiBasePath + "/menu_items.json").then(function (response) {
                return response.data.menu_items.filter(item => item.description.toLowerCase().indexOf(searchTerm) !== -1);;
            });
        }
    }

})(); 