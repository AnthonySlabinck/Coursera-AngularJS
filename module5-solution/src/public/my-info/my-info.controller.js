(function() {
    'use strict';

    angular
        .module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['MenuService', 'UserService'];

    function MyInfoController(MenuService, UserService) {
        var vm = this;

        activate();

        function activate() {
            vm.user = UserService.getUser();

            if (vm.user) {
                MenuService.getMenuItemByShortName(vm.user.favoriteDishNumber).then(function(result) {
                    vm.menuItem = result;
                });
            }
        }
    }
})();