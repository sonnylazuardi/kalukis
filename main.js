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
function(Lukis, Pencil){
  var lukis = new Lukis("lukis");

  // attaching modules
  // TODO a better way to register plugins?
  Pencil.attachTo("#pencil", {
    canvas: lukis.canvas
  });
});