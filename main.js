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
  "lukis",
  "ui/pencil"
  ],
function(lukis, pencil){
  // attaching modules
  lukis.attachTo("#lukis");
  pencil.attachTo("#pencil",{
    canvasEl: "#lukis"
  });
});