"use strict";

angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, Location, GoogleSearch) {
  $scope.query;
  $scope.places = [];
  $scope.latitude;
  $scope.longitude;

  $scope.markers = [];

  /* Use GoogleSearch service to query API for places */
  $scope.searchGoogle = function(query, latitude, longitude) {
    
    GoogleSearch.search(query, latitude, longitude)
    
    .then(function(data) {
      console.log(data.results);
      $scope.places = data.results;
      /* Find lat and lng of each place and create a marker */
      $scope.places.forEach(function(place, index) {

        var marker = {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          title: index + 1,
          id: index + 1
        };
        $scope.markers.push(marker);
      });
    });
  };

  /* On load, get location of the client */
  Location.search().then(function(position) {
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;

    $scope.map = {
      center: {
        latitude: $scope.latitude,
        longitude: $scope.longitude
      },
      zoom: 13,
    };
  });
});

