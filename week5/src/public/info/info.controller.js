(function(){
'use strict';

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['signupdata']
function InfoController(signupdata) {
  let vm = this;
  this.$onInit = function () {
    vm.user = signupdata;
    if (Object.keys(vm.user).length){
    }
  }
}

})();
