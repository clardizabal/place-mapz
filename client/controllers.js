angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, GoogleSearch) {
  $scope.testKey = GoogleSearch.testKey;
});