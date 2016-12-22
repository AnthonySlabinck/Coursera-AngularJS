(function() {
    "use strict";

    angular.module('common', [])
        .constant('ApiPath', 'https://nameless-forest-62558.herokuapp.com')
        .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('loadingHttpInterceptor');
    }

})();