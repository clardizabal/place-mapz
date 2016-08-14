"use strict";

angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, GoogleSearch) {
  $scope.query;
  $scope.places = [];
  $scope.latitude;
  $scope.longitude;

  /* Get current location of client */
  $scope.getLocation = function() {
    
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      
    });
  };

  /* Use GoogleSearch service to query API for places */
  $scope.searchGoogle = function(query, latitude, longitude) {
    
    GoogleSearch($scope.query, $scope.latitude, $scope.longitude)
    
    .then(function(data) {
      $scope.places = data.results;
    });
  };

  /* On load, get location of the client */
  $scope.getLocation();
});
