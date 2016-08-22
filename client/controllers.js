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

      /* Some places don't have any photos. If place has photos, use photo_reference to get photo
      from Google API, otherwise use icon*/
      var image = data.result.photos ?
        GoogleSearch.photos(data.result.photos[0].photo_reference) : data.result.icon;

      /* Show pop-up dialog*/
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog.template.html',
        parent: angular.element(document.body),
        locals: {
          data: data.result,
          image: image
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

  function DialogController($scope, $mdDialog, data, image) {
    $scope.data = data;
    $scope.image = image;
  }
});

