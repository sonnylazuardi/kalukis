({
  baseUrl: "apps",
  paths:{
    requireLib:"../components/requirejs/require",
    fabric: "../libs/fabric",
    jquery: "../components/jquery/jquery",
    hbs: "../components/require-handlebars-plugin/hbs",
    handlebars: "../components/require-handlebars-plugin/Handlebars",
    underscore: "../components/require-handlebars-plugin/hbs/underscore",
    json2: "../components/require-handlebars-plugin/hbs/json2",
    i18nprecompile: "../components/require-handlebars-plugin/hbs/i18nprecompile",
    bootstrap: "../components/bootstrap/js/bootstrap",
    spectrum: "../components/spectrum/spectrum"
  },
  shim:{
    fabric: {
      exports: "fabric"
    },
    jquery: {
      exports: "$"
    },
    "spectrum": ["jquery"],
    "../components/flight/lib/component": {
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
      'flight/component': '../components/flight/lib/component',
      'brushes': 'brushes'
    }
  },
  name: "../main",
  include: ["requireLib"],
  out: "main-built.js"
})