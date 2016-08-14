angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, GoogleSearch) {
  $scope.testKey = GoogleSearch.testKey;
  $scope.places = [];

  $scope.getLocation = function() {
    
    navigator.geolocation.getCurrentPosition(function(position) {
      
      GoogleSearch(position.coords.latitude, position.coords.longitude)

      .then(function(data) {
    
        $scope.places = data.results;
      });
    });
  };
});
