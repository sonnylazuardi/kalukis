require.config({
  baseUrl: "scripts",
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