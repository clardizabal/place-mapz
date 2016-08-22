"use strict";
angular.module('app.googleServices', [])

.factory('GoogleSearch', function($http) {

  var search = function(query, latitude, longitude) {
    
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
      headers: {},
      params: {
        query: query,
        key: GOOGLE_PLACES_API_KEY,
        location: latitude + ',' + longitude,
        rankby: 'prominence',
        radius: RADIUS,
      },
    }).then(function(response) {

      return response.data;
    });
  };

  var details = function(placeid) {
    
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/details/json',
      headers: {},
      params: {
        placeid: placeid,
        key: GOOGLE_PLACES_API_KEY
      }
    }).then(function(response) {

      return response.data;
    })
  }

  var photos = function(photoreference) {
  
    return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=' + GOOGLE_PLACES_API_KEY;
  }

  return {
    search: search,
    details: details,
    photos: photos
  }
});
