require.config({
  baseUrl: "apps",
  paths: {
    fabric: "../libs/fabric",
    jquery: "../components/jquery/jquery"
  },

  shim:{
    fabric: {
      exports: "fabric"
    },
    "../components/flight/lib/component": {
      deps: ["jquery"]
    }
  },

  map: {
    "*": {
      'flight/component': '../components/flight/lib/component'
    }
  }
});

require(["boots","../components/flight/tools/debug/debug"],
function(boots, debug){
  debug.enable(true);
  // kickstart the application
  boots();
});