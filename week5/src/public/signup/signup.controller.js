(function () {
"use strict";

angular.module('public')
.factory('signupdata', signupdata)
.controller('SignupController', SignupController);

function signupdata() {
  return {};
}

SignupController.$inject = ['signupdata', '$http'];
function SignupController(signupdata, $http) {
  var reg = this;
  let ApiPath = 'https://yalei-learnangular.herokuapp.com/menu_items/';
  this.$onInit = function () {
    reg.user = signupdata;
    reg.msg = '';
    reg.save = Object.keys(reg.user).length > 0;
    if (reg.save) reg.msg = 'Your information has been saved';
  }

  reg.submit = function () {
    reg.msg = '';
    $http.get(ApiPath + reg.user.favor + '.json').then(
      function (res) {
        reg.save = true;
        reg.msg = 'Your information has been saved';
        reg.user.items = res.data;
      },
      function (err) {
        reg.msg = 'No such menu number exists';
      }
    )
  }
}


})();
