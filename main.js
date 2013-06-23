require.config({
  baseUrl: "apps",

  paths: {
    fabric: "../canvas-libs/fabric"
  },

  shim:{
    fabric: {
      exports: "fabric"
    }
  }
});

require(["lukis"],
function(Lukis){
  var lukis = new Lukis("lukis");
});