"use strict";

angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, $mdDialog, Location, GoogleSearch) {
  $scope.query;
  $scope.places = [];
  $scope.latitude;
  $scope.longitude;

  $scope.markers = [];
  $scope.options = {
    styles: [
      {
        stylers: [{saturation: -100}]
      }
    ]
  };

  /* Use GoogleSearch service to query API for places */
  $scope.searchGoogle = function(query, latitude, longitude) {
    
    GoogleSearch.search(query, latitude, longitude)
    
    .then(function(data) {
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

  /* On click function to show more details */
  $scope.showAdvanced = function(place, ev) {

    GoogleSearch.details(place.place_id)

    .then(function(data) {

      console.log(data);

      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog.template.html',
        parent: angular.element(document.body),
        locals: {
          data: data.result,
        },
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
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

  function DialogController($scope, $mdDialog, data) {
    $scope.data = data;
  }
});

