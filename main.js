require.config({
  baseUrl: "apps",
  paths: {
    fabric: "../libs/fabric",
    flight: "../libs/flight"
  },

  shim:{
    fabric: {
      exports: "fabric"
    },
    flight: {
      exports: "flight"
    }
  }
});

require([
  "boots"
  ],
function(boots){
  // kickstart the application
  boots();
});