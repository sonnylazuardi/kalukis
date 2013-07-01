var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/Spec\.js$/.test(file));
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/apps/scripts',

    paths: {
      fabric: "canvas-lib/fabric",
      jquery: "vendor/jquery/jquery",
      text: "vendor/requirejs-text/text",
      handlebars: "vendor/handlebars/handlebars",
      bootstrap: "vendor/bootstrap.css/js/bootstrap",
      spectrum: "vendor/spectrum/spectrum"
    },

    shim:{
      fabric: {
        exports: "fabric"
      },
      jquery: {
        exports: "$"
      },
      "spectrum": ["jquery"],
      "jasmine-jquery": ["jquery"],
      "vendor/flight/lib/component": {
        deps: ["jquery"]
      },
      bootstrap: {
        deps: ["jquery"]
      },
      'handlebars': {
        exports: 'Handlebars'
      }
    },

    map: {
      "*": {
        'flight/component': 'vendor/flight/lib/component',
        'brushes': 'brushes'
      }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
