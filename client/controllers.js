"use strict";

angular.module('app.controllers', [])

.controller('SearchCtrl', function($scope, $window, $mdDialog, $mdSidenav, Location, GoogleSearch) {
  $scope.query;
  $scope.queries = {};
  $scope.places = [];
  $scope.recentSearches = [];
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
    if (!$scope.queries.hasOwnProperty(query)) {
      $scope.queries[query] = query;
      $scope.recentSearches.push(query);
    }
    latitude = latitude || $scope.latitude;
    longitude = longitude || $scope.longitude;
    
    GoogleSearch.search(query, latitude, longitude)
    
    .then(function(data) {
      /* Scroll back to top of page with every new search */
      $window.scrollTo(0,0);
      $scope.places = data.results;
      $scope.markers = [];
      if ($scope.places.length > 0) {
        /* Remove extra query results from places array */
        $scope.places.splice(resultsLimit, GOOGLE_QUERY_RESULTS - resultsLimit);
        /* zIndex starts off with value == number of results and is decremented to
        send next marker behind the other */
        $scope.zIndex = resultsLimit;

        /* Find lat and lng of each place and create a marker to be added to map */
        $scope.places.forEach(function(place, index) {
          /* Assign place with a label that associates with map */
          $scope.places[index].label = letters.charAt(index);
          /* Some places are giving incorrect lat and lng in the middle of the ocean! */
          if (!!place.geometry.location.lat && !!place.geometry.location.lng) {
            var marker = {
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
              id: index,
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
          } else {
            console.log('something funnny will happen to the map: ', letters.charAt(index));
          }
        });
      } else {
        showAlert();
        centerMap();
      }
    });
  };

  $scope.redoSearch = function(query) {
    $scope.toggleLeft();
    $scope.searchGoogle(query, $scope.latitude, $scope.longitude);
  }

  $scope.toggleLeft = function() {
    $mdSidenav('left').toggle();
  }

  $scope.showAdvanced = showAdvanced;


  /* On load, get location of the client */
  Location.search().then(function(position) {
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
    centerMap();
  });

  /* Bring marker to fron by setting zIndex to highest value.
     BUG occurs with markers with after first search */
  // $scope.eventsObject = {
  //       mouseover: markerMouseOver,
  // };
  // function markerMouseOver(marker, e, m) {
  //   m.options.zIndex = $scope.zIndex++;
  // }

  function centerMap() {
    $scope.map = {
      center: {
        latitude: $scope.latitude,
        longitude: $scope.longitude
      },
      zoom: 13,
    };
  }

  /* On click function to show more details */
  function showAdvanced(place, ev) {

    GoogleSearch.details(place.place_id)

    .then(function(data) {
      /* Create a string from the types result to find similar places */
      // var types = data.result.types.reduce(function(sum, type) {
      //   return sum += type + " ";
      // },'');
      var type = data.result.types[0];

      /* Some places don't have any photos. If place has photos, use photo_reference to get photo
      from Google API, otherwise use icon */
      var photos = data.result.photos ?
        data.result.photos.map(function(photo) {
          return GoogleSearch.photos(photo.photo_reference);
        }) : [data.result.icon];

      /* Show pop-up dialog*/
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog.template.html',
        parent: angular.element(document.body),
        locals: {
          data: data.result,
          photos: photos,
          searchGoogle: $scope.searchGoogle,
          type: type
        },
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    });
  };

  function DialogController($scope, $mdDialog, data, photos, searchGoogle, type) {
    $scope.data = data;
    $scope.image = photos[0];
    $scope.photos = photos;
    /* Some places don't have opening hours available */
    $scope.hours = data.opening_hours ?
      data.opening_hours.weekday_text[GoogleSearch.today()] : 'N/A';
    $scope.status = data.opening_hours ? (data.opening_hours.open_now ? 'OPEN' : 'CLOSED') : '';
    $scope.findSimilar = function() {
      $mdDialog.hide();
      searchGoogle(type, $scope.latitude, $scope.longitude);
    }
  }

  function showAlert() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#conentContainer')))
        .clickOutsideToClose(true)
        .title('P l a c e M a p z')
        .textContent('Sorry, no results found')
        .ok('Got it!')
    );
  }
});

