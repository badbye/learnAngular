(function(){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.message = '';
  $scope.lunch = '';

  $scope.eat = function () {
    var lunch = [];
    $scope.lunch.split(',').forEach(function(s){
      if (s.trim() != '') lunch.push(s);
    })
    console.log(lunch);
    if (!lunch.length){
      $scope.message = 'Please enter data first';
      $scope.msg_color = "red";
      $scope.lunch_color = "red";
      $scope.lunch = '';
      return
    }
    if (lunch.length <= 3){
      $scope.message = 'Enjoy!';
    }else{
      $scope.message = 'Too much!';
    }
    $scope.msg_color = "green";
    $scope.lunch_color = "green";
  };
}

})();
