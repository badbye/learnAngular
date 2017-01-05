angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService ($http){
  var vm = this;
  vm.getAllCategories = function(){
    return $http.get('https://davids-restaurant.herokuapp.com/categories.json')
    .then(res=>{
      return res.data;
    })
  };

  vm.getItemsForCategory = function(itemShortName){
    return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json?category=' + itemShortName)
    .then(res=>{
      return res.data;
    })
  }

};
