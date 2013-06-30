require.config({
  baseUrl: "scripts",
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
  }
});

require(

[
  "app",
  "bootstrap",
  "spectrum"
],

function(Application){
  // kickstart the application
  Application.boots();
});