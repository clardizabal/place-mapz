"use strict";

angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, Location, GoogleSearch) {
  $scope.query;
  $scope.places = [];
  $scope.latitude;
  $scope.longitude;

  /* Use GoogleSearch service to query API for places */
  $scope.searchGoogle = function(query, latitude, longitude) {
    
    GoogleSearch.search(query, latitude, longitude)
    
    .then(function(data) {
      console.log(data.results);
      $scope.places = data.results;
    });
  };

  /* On load, get location of the client */
  Location.search().then(function(position) {
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
    $scope.randomMarkers = [
      {
        latitude: $scope.latitude,
        longitude: $scope.longitude,
        title: 'hello world',
        id: 1
      }
    ];
    $scope.map = {
      markers:[{
        latitude: $scope.latitude,
        longitude: $scope.longitude
      }],
      center: {
        latitude: $scope.latitude,
        longitude: $scope.longitude
      },
      zoom: 14
    };
  });
});

