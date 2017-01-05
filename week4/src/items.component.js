(function(){
'use strict';

angular.module('MenuApp')
.component('item', {
  templateUrl: 'template/item.html',
  bindings: {
    values: '<'
  }
});


})();
