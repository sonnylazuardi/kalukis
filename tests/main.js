require.config({
  baseUrl: "../apps/scripts",

  paths: {
    fabric: "canvas-lib/fabric",
    text: "vendor/requirejs-text/text",
    mustache: "vendor/mustache/mustache"
  },

  shim:{
    fabric: {
      exports: "fabric"
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
  "specs/brushRectSpec",
  "specs/circleShapeBrushSpec",
  "specs/lineOutlineSpec"
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