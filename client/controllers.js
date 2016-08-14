angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, GoogleSearch) {
  $scope.testKey = GoogleSearch.testKey;
  // $scope.searchGoogle = GoogleSearch.searchGoogle;

  $scope.getLocation = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      GoogleSearch.searchGoogle(position.coords.latitude, position.coords.longitude);
    });
  };
});
