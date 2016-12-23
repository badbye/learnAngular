(function(){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject =['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListService) {
  var tb = this;
  tb.items = ShoppingListService.getToBuy();
  tb.buy = function (index){
    console.log(index);
    ShoppingListService.buy(index);
  }
};

function AlreadyBoughtController(ShoppingListService) {
  var ab = this;
  ab.items = ShoppingListService.getBought();
};

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItems = [{ name: "cookies", quantity: 10 },
                    { name: "water", quantity: 20 },
                    { name: "apples", quantity: 10 },
                    { name: "books", quantity: 10 },
                    { name: "cakes", quantity: 20 }
                   ];
  var boughtItems = [];

  service.getToBuy = function () {
    return toBuyItems;
  }
  service.getBought = function () {
    return boughtItems;
  }
  service.buy = function (index) {
    boughtItems.push(toBuyItems[index]);
    toBuyItems.splice(index, 1);
  };

};

})();
