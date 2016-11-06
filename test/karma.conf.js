// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-09-07 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      'bower_components/bootstrap-material-design/dist/js/material.js',
      'bower_components/bootstrap-material-design/dist/js/ripples.js',
      'bower_components/jquery-ui/ui/jquery-ui.js',
      'bower_components/Chart.js/Chart.js',
      'bower_components/angular-chart.js/dist/angular-chart.js',
      'bower_components/angular-utf8-base64/angular-utf8-base64.js',
      'bower_components/angular-base64-upload/src/angular-base64-upload.js',
      'bower_components/angular-ui-slider/src/slider.js',
      'bower_components/arrive/src/arrive.js',
      'bower_components/angular-clipboard/angular-clipboard.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/openCompareEditorApp.js',
      'app/editor/openCompareEditor.js',
      'app/**/*.js',
      //'test/mock/**/*.js',
      {pattern: 'app/foopcm1.json', watched: true, served: true, included: false},
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 9001,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
	 'PhantomJS',
	 //'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
      // '/': 'http://localhost:9001/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
