(function() {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'UserService'];

    function SignUpController(MenuService, UserService) {
        var vm = this;

        vm.validShortName = false;

        vm.validateFavoriteDishNumber = function() {
            if (vm.user.favoriteDishNumber) {
                MenuService.getMenuItemByShortName(vm.user.favoriteDishNumber).then(function(result) {
                    vm.message = "";
                    vm.validShortName = true;
                }).catch(function(error) {
                    vm.message = "No such menu number exists";
                    vm.validShortName = false;
                });
            } else {
                vm.validShortName = false;
                vm.message = "";
            }
        }

        vm.submit = function() {
            UserService.saveUser(vm.user);

            vm.completed = "Your information has been saved";
        };
    }
})();