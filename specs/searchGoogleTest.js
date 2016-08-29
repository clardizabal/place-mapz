"use strict";
// var assert = require('chai').assert;
describe('Search Controller', function() {
  var createController;
  var Location;
  var GoogleSearch;
  var $rootScope;
  var $scope;
  var $mdDialog;
  var $q;
  var deferred;

  beforeEach(module('app'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $mdDialog = $injector.get('$mdDialog');
    Location = $injector.get('Location');
    GoogleSearch = $injector.get('GoogleSearch');
    $scope = $rootScope.$new();
    // $q = $injector.get('$q');

    var $controller = $injector.get('$controller');


    createController = function() {
      return $controller('SearchCtrl', {
        $scope: $scope,
        $mdDialog: $mdDialog,
        Location: Location
      });
    };

    createController();
  }));

  it('should have a places property on the $scope', function() {
    // createController();
    expect(Array.isArray($scope.places)).to.equal(true);
  });

  it('should call `Location.search()` when controller is loaded', function() {
    sinon.spy(Location, 'search');
    createController();
    expect(Location.search.called).to.equal(true);
  });

  describe('Location', function() {
    it('search method should return a latitude/longitude coords', function() {
      Location.search().then(function(position) {
        expect(typeof position.coords.latitude).to.equal('number');
      });
    })
  });

  describe('GoogleSearch', function() {
    it('search method should return results', function() {
      var query = 'coffee';
      var latitude = 37.7111977;
      var longitude = -122.44916289999999;
      GoogleSearch.search(query, latitude, longitude).then(function(data) {
        expect(data.results.length).to.equal(20);
      });
    });
  });

  it('should add to $scope.places for successful search', function() {
    createController();
    var query = 'coffee';
    var latitude = 37.7111977;
    var longitude = -122.44916289999999;
    $scope.searchGoogle(query, latitude, longitude, function() {
      expect($scope.places.length).to.equal(20);
    });
  });

  it('should add markers for successful search', function() {
    createController();
    var query = 'coffee';
    var latitude = 37.7111977;
    var longitude = -122.44916289999999;
    $scope.searchGoogle(query, latitude, longitude, function() {
      expect($scope.markers.length).to.equal(20);
      expect(typeof $scope.markers.latitude).to.equal('number');
      expect(typeof $scope.markers.longitude).to.equal('number');
      expect(typeof $scope.markers.id).to.equal('number');
    });
  });

  it('should show alert if no results are returned from GoogleSearch', function() {
    createController();
    var query = 'askdhfalkjhfasdf';
    var latitude = 37.7111977;
    var longitude = -122.44916289999999;
    sinon.spy($scope, 'showAlert');
    $scope.searchGoogle(query, latitude, longitude, function() {
      expect($scope.showAlert.called).to.equal(true);
    });
  });

  it('should show a pop up dialog for advanced details', function() {
    createController();
    sinon.spy($mdDialog, 'show');
    var place = 'Philz';
    var ev = 'click';
    $scope.showAdvanced(place, ev, function() {
      expect($mdDialog.show.called).to.equal(true);
    });
  });

});
