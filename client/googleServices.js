"use strict";
angular.module('app.googleServices', [])

.factory('GoogleSearch', function($http) {
  const test = 'coffee';

  return function(query, latitude, longitude) {
    
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
      headers: {},
      params: {
        query: query,
        key: GOOGLE_PLACES_API_KEY,
        location: latitude + ',' + longitude,
        rankby: 'prominence',
        radius: 20000,
      },
    }).then(function(response) {

      return response.data;
    });
  };
});
