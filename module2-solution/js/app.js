(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var vm = this;

    vm.items = ShoppingListCheckOffService.getItemsToBuy();

    vm.moveItem = function (index) {
      ShoppingListCheckOffService.moveItem(index);
    };

  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var vm = this;

    vm.items = ShoppingListCheckOffService.getItemsBought();

  }

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
      { name: "cookies", quantity: 10 },
      { name: "apples", quantity: 10 },
      { name: "eggs", quantity: 10 },
      { name: "fish", quantity: 10 },
      { name: "sheep", quantity: 10 }
    ];
    var itemsBought = [];

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.getItemsBought = function () {
      return itemsBought;
    };

    service.moveItem = function (index) {
      itemsBought.push(itemsToBuy[index]);
      itemsToBuy.splice(index, 1);
    }

  }

})();
