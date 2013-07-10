require.config({
  baseUrl: "../apps/scripts",

  paths: {
    fabric: "canvas-lib/fabric",
    text: "vendor/requirejs-text/text",
    handlebars: "vendor/handlebars/handlebars"
  },

  shim:{
    fabric: {
      exports: "fabric"
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  },

  map: {
    "*": {
      'flight/component': 'vendor/flight/lib/component',
      'flight': 'vendor/flight',
      'brushes': 'brushes',
      'specs': '../../tests/specs'
    }
  }
});

require(

[
  "specs/brushesListSpec",
  "specs/brushesComboSpec",
  "specs/colorPickerSpec",
  "specs/rectOutlinePainterSpec",
  "specs/circleOutlineSpec",
  "specs/brushRectSpec"
],

function(){
  var jasmineEnv = jasmine.getEnv();

  var htmlReporter = new jasmine.BootstrapReporter();
  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
  };

  jasmineEnv.execute();
});