(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.menu = '';
    $scope.message = '';
    $scope.empty = true;

    $scope.checkIfTooMuch = function () {
      var res = $scope.menu.split(',')
        .map(str => str.trim())
        .filter(str => str !== '');
      if (res.length === 0) {
        $scope.message = 'Please enter data first';
        $scope.empty = true;
      } else if (res.length <= 3) {
        $scope.message = 'Enjoy!';
        $scope.empty = false;
      } else {
        $scope.message = 'Too much!';
        $scope.empty = false;
      }
    }
  }

})();