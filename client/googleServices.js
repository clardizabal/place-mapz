"use strict";
angular.module('app.googleServices', [])

.factory('GoogleSearch', function($http) {

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
        radius: RADIUS,
      },
    }).then(function(response) {
      console.log(response.data);
      return response.data;
    });
  };
});
