require.config({
  baseUrl: "scripts",

  paths: {
    fabric: "canvas-lib/fabric",
    jquery: "../../vendor/jquery/jquery",
    text: "../../vendor/requirejs-text/text",
    mustache: "../../vendor/mustache/mustache",
    spectrum: "../../vendor/spectrum/spectrum",
    "es5-shim": "../../vendor/es5-shim/es5-shim",
    "es5-sham": "../../vendor/es5-shim/es5-sham"
  },

  shim:{
    fabric: {
      exports: "fabric"
    },
    jquery: {
      exports: "$"
    },
    "spectrum": ["jquery"],
    "../../vendor/flight/lib/component": {
      deps: ["jquery"]
    }
  },

  map: {
    "*": {
      'flight/component': '../../vendor/flight/lib/component',
      'flight': '../../vendor/flight',
      'brushes': 'brushes'
    }
  }
});

require(

[
  "app",
  "spectrum",
  "es5-shim",
  "es5-sham"
],

function(Application){
  // kickstart the application
  Application.boots();
});