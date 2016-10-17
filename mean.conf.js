// Karma configuration
// Generated on Mon Oct 17 2016 23:58:57 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './ExpressMongo',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

      // Detailed pattern to include a file. Similarly other options can be used
      { pattern: 'lib/angular.js', watched: false },
      // Prefer to have watched false for library files. No need to watch them for changes

      // simple pattern to load the needed testfiles
      // equal to {pattern: 'test/unit/*.spec.js', watched: true, served: true, included: true}
      'public/test/unit/*.test.js',

      // this file gets served but will be ignored by the watcher
      // note if html2js preprocessor is active, reference as `window.__html__['compiled/index.html']`
      {pattern: 'compiled/index.html', watched: false},

      // this file only gets watched and is otherwise ignored
      {pattern: 'app/index.html', included: false, served: false},

      // this file will be served on demand from disk and will be ignored by the watcher
      {pattern: 'compiled/app.js.map', included: false, served: true, watched: false, nocache: true}
    ],


    // list of files to exclude
    exclude: [
      './node_modules'
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        './public/*.js': 'coverage'
      },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage'],

      coverageReporter: {
        type : 'html',
        dir : 'coverage/'
      },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
