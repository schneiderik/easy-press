module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['browserify', 'mocha', 'es5-shim'],
    autoWatch: true,
    browsers: ['PhantomJS'],

    plugins: [
      'karma-mocha',
      'karma-browserify',
      'karma-es5-shim',
      'karma-phantomjs-launcher'
    ],

    port: 7357,
    reporters: ['dots'],
    preprocessors: {
      'test/unit/**/*.js': ['browserify']
    },
    browserify: {
      extensions: ['.js', '.json'],
      transform: ['babelify'],
      ignore: [],
      watch: true,
      debug: true,
      noParse: []
    },
    files: [
      'test/unit/**/*.js'
    ],
    exclude: ['**/*.swp']
  });
};
