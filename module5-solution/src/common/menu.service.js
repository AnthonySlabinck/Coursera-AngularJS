(function() {
    "use strict";

    angular.module('common')
        .service('MenuService', MenuService);


    MenuService.$inject = ['$http', '$q', 'ApiPath'];

    function MenuService($http, $q, ApiPath) {
        var service = this;

        service.getCategories = function() {
            return $http.get(ApiPath + '/categories.json').then(function(response) {
                return response.data;
            });
        };


        service.getMenuItems = function(category) {
            var config = {};
            if (category) {
                config.params = { 'category': category };
            }

            return $http.get(ApiPath + '/menu_items.json', config).then(function(response) {
                return response.data;
            });
        };

        service.getMenuItemByShortName = function(shortName) {
            return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function(response) {
                return response.data;
            });
        };

    }



})();