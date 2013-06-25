require.config({
  baseUrl: "apps",
  paths: {
    fabric: "../libs/fabric",
    jquery: "../components/jquery/jquery",
    hbs: "../components/require-handlebars-plugin/hbs",
    handlebars: "../components/require-handlebars-plugin/Handlebars",
    underscore: "../components/require-handlebars-plugin/hbs/underscore",
    json2: "../components/require-handlebars-plugin/hbs/json2",
    i18nprecompile: "../components/require-handlebars-plugin/hbs/i18nprecompile",
    bootstrap: "../components/bootstrap/js/bootstrap"
  },

  shim:{
    fabric: {
      exports: "fabric"
    },
    jquery: {
      exports: "$"
    },
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
      'flight/component': '../components/flight/lib/component'
    }
  }
});

require(["boots"],
function(boots){
  // kickstart the application
  boots();
});