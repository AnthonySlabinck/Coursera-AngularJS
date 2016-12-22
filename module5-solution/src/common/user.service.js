(function() {
    "use strict";

    angular.module('common')
        .service('UserService', UserService);

    UserService.$inject = [];

    function UserService() {
        var service = this;

        var user;

        service.saveUser = function(userToSave) {
            user = userToSave;
        };

        service.getUser = function() {
            return user;
        }
    }

})();