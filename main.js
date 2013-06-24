require.config({
  baseUrl: "./",
  paths: {
    fabric: "libs/fabric",
    jquery: "components/jquery/jquery"
  },

  shim:{
    fabric: {
      exports: "fabric"
    },
    "components/flight/lib/component": {
      deps: ["jquery"]
    }
  },

  map: {
    "*": {
      'flight/component': 'components/flight/lib/component'
    }
  }
});

require(["apps/boots"], function(boots){
  // kickstart the application
  boots();
});