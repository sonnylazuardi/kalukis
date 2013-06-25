define(

[
  "lukis",
  "ui/pencil",
  "ui/brushescombo",
  "data/brusheslist",
  "bootstrap"
],

function(Lukis, Pencil, BrushesCombo, BrushesList){

  function boots(){
    // attach modules

    // CanvasMixin.attachTo("#lukis");
    Lukis.attachTo("#lukis");
    Pencil.attachTo("#pencil", {
      canvasEl: "#lukis"
    });
    BrushesList.attachTo("#lukis");
    BrushesCombo.attachTo("#brushescombo", {
      canvasEl: "#lukis",
      pencilButton: "#pencil"
    });
  }

  return boots;
});