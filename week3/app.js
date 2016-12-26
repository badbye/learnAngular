(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuSearchService', '$interval'];
MenuSearchService.$inject = ['$http', '$filter'];

function NarrowItDownController(MenuSearchService, $interval){
  var vm = this;
  // vm.found = [];
  vm.getMatchedMenuItems = function(){
    vm.show = false;
    vm.found = [];
    vm.loading = 'Searching ...'
    var loading = $interval(function () {
      vm.loading += '.'
    }, 500);
    MenuSearchService.getMatchedMenuItems(vm.search).then(res=>{
      $interval.cancel(loading);
      vm.found = res;
      vm.loading = false;
      vm.show = true;
    });
  };

  vm.removeItem = function(index){
    vm.found.splice(index, 1);
  }
};


function MenuSearchService($http, $filter){
  var service = this;
  service.getMatchedMenuItems = function(search){
    return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(res=>{
      var foundItems = $filter('filter')(res.data['menu_items'], {description: search});
      return foundItems;
    }, function(e){
      console.log('Error: ' + e);
      return [];
    });
  };
};


function FoundItems(){
  return {
    scope : {found: '<', onRemove: '&', show: '<'},
    templateUrl: 'item.html'
  }
};

})();
