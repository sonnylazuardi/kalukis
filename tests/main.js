require.config({
  baseUrl: "../apps/scripts",

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
      'flight': 'vendor/flight',
      'specs': '../../tests/specs',
      'brushes': 'brushes'
    }
  }
});

require(

[
  "specs/brushesListSpec",
  "specs/brushesComboSpec"
],

function(require){
  var jasmineEnv = jasmine.getEnv();

  var htmlReporter = new jasmine.BootstrapReporter();
  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
  };

  jasmineEnv.execute();
});