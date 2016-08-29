// Karma configuration

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // testing frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser. order matters!
    files: [
      // angular source
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-material/angular-material.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-messages/angular-messages.js',
      'node_modules/lodash/lodash.js',
      'node_modules/angular-simple-logger/dist/angular-simple-logger.js',
      'node_modules/angular-google-maps/dist/angular-google-maps.js',

      // our app code
      'client/*.js',

      // our spec files - in order of the README
      'specs/searchGoogleTest.js',
    ],

    // test results reporter to use
    reporters: ['nyan', 'unicorn'],

    // start these browsers. PhantomJS will load up in the background
    browsers: ['PhantomJS'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // if true, Karma exits after running the tests.
    singleRun: true

  });
};
