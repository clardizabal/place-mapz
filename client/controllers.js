"use strict";

angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, $mdDialog, Location, GoogleSearch) {
  $scope.query;
  $scope.places = [];
  $scope.markers = [];
  $scope.latitude;
  $scope.longitude;

  /* map options */
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

      /* Remove extra query results from places array */
      $scope.places.splice(resultsLimit, GOOGLE_QUERY_RESULTS - resultsLimit);
      /* zIndex property added to scope for mouseover event */
      $scope.zIndex = resultsLimit;

      /* Find lat and lng of each place and create a marker to be added to map */
      $scope.places.forEach(function(place, index) {
        /* Assign place with a label that associates with map */
        $scope.places[index].label = letters.charAt(index);
        var marker = {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          id: index + 1,
          options: {
            zIndex: $scope.zIndex--,
            label: {
              text: $scope.places[index].label,
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold'
            }
          }
        };
        $scope.markers.push(marker);
      });
    });
  };

  /* EVENT HANDLER FOR CLICK ON SEARCH RESULTS */  
  $scope.showAdvanced = showAdvanced;

  /* EVENT HANDLER FOR MARKERS */
  $scope.eventsObject = {
        mouseover: markerMouseOver,
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


  /* Bring marker to fron by setting zIndex to highest value */
  function markerMouseOver(marker, e, m) {
      $scope.zIndex = ++resultsLimit;
      m.options.zIndex = $scope.zIndex;
  }

  /* On click function to show more details */
  function showAdvanced(place, ev) {

    GoogleSearch.details(place.place_id)

    .then(function(data) {

      /* Some places don't have any photos. If place has photos, use photo_reference to get photo
      from Google API, otherwise use icon*/
      var image = data.result.photos ?
        GoogleSearch.photos(data.result.photos[0].photo_reference) : data.result.icon;
      console.log(data);
      // console.log(image);
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

  function DialogController($scope, $mdDialog, data, image) {
    $scope.data = data;
    $scope.image = image;
    /* Some places don't have opening hours available */
    $scope.hours = data.opening_hours ?
      data.opening_hours.weekday_text[GoogleSearch.today()] : 'N/A';
    $scope.status = data.opening_hours ? (data.opening_hours.open_now ? 'OPEN' : 'CLOSED') : '';
    console.log($scope.status);
  }
});

