"use strict";
angular.module('app.googleServices', [])

.factory('GoogleSearch', function($http) {
  // const KEY = require('config.js');

  var testKey = function() {
    console.log(GOOGLE_PLACES_API_KEY);
  };

  return {
    testKey:testKey,
  }

});