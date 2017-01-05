(function(){
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'template/categories.html',
  bindings: {
    values: '<'
  }
});


})();
