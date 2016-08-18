'use strict';

var gulp = require('gulp');
// var sync = require('browser-sync');
// var nodemon = require('gulp-nodemon');
var KarmaServer = require('karma').Server;

// Run our karma tests
gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});
