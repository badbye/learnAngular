(function(){
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'template/home.html',
    controller: EventController
  })

  .state('categories', {
    url: '/categories',
    template: '<categories values="$resolve.category"></categories>',
    resolve: {
      category: ['MenuDataService', function(MenuDataService){
                  return MenuDataService.getAllCategories().then(function(res){
                    return res;
                  });
                 }]
    }
  })

  .state('item', {
    url: '/item/{itemId}',
    template: '<item values="$resolve.items"></item>',
    resolve: {
        items: ['MenuDataService', '$stateParams',
                function(MenuDataService, $stateParams){
                  return MenuDataService.getItemsForCategory($stateParams.itemId).then(function(res) {
                    return res;
                  });
                }
    ]}
  })
};


EventController.$inject = ['$rootScope']
function EventController($rootScope) {
  var $ctrl = this;
  var cancellers = [];

  $ctrl.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
      $rootScope.wait = true;
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
      $rootScope.wait = false;
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
      $rootScope.wait = false;
      console.log('change error: ');
      console.log(error);
    });
    cancellers.push(cancel);
  };

  $ctrl.$onDestroy = function () {
    $rootScope.wait = false;
    cancellers.forEach(function (item) {
      item();
    });
  };

};


})();
