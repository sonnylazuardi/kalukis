var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/_spec\.js$/.test(file));
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/apps/scripts',

    paths: {
      fabric: "canvas-lib/fabric",
      jquery: "vendor/jquery/jquery",
      hbs: "vendor/require-handlebars-plugin/hbs",
      handlebars: "vendor/require-handlebars-plugin/Handlebars",
      underscore: "vendor/require-handlebars-plugin/hbs/underscore",
      json2: "vendor/require-handlebars-plugin/hbs/json2",
      i18nprecompile: "vendor/require-handlebars-plugin/hbs/i18nprecompile",
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
      "vendor/flight/lib/component": {
        deps: ["jquery"]
      },
      bootstrap: {
        deps: ["jquery"]
      },
      hbs: {
        deps:["handlebars", "underscore", "i18nprecompile", "json2"]
      }
    },

    hbs: {
      disableI18n: true
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

