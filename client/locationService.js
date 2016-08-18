"use strict";
angular.module('app.locationService', [])

.factory('Location', function($q) {

  var search = function() {
    var deferred = $q.defer();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        deferred.resolve(position);
      });
    } else {
      deferred.reject('Problem with navigator.geolocation: ' + navigator.geolocation);
    }

    return deferred.promise;
  }

  return {
    search: search
  }
});
