define([
  "lukis",
  "ui/pencil"
],
function(Lukis, Pencil){
  function boots(){
    // attach modules

    // CanvasMixin.attachTo("#lukis");
    Lukis.attachTo("#lukis");
    Pencil.attachTo("#pencil", {
      canvasEl: "#lukis"
    });
  }

  return boots;
});