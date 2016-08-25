"use strict";
angular.module('app', [
  'ngMaterial',
  'ngMessages',
  'uiGmapgoogle-maps',
  'app.locationService',
  'app.googleServices',
  'app.controllers'
])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('pink');
});
