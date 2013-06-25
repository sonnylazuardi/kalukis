define([
  "lukis",
  "ui/pencil",
  "ui/brushescombo"
],
function(Lukis, Pencil, BrushesCombo){
  function boots(){
    // attach modules

    // CanvasMixin.attachTo("#lukis");
    Lukis.attachTo("#lukis");
    Pencil.attachTo("#pencil", {
      canvasEl: "#lukis"
    });
    BrushesCombo.attachTo("#brushescombo", {
      canvasEl: "#lukis",
      pencilButton: "#pencil"
    });
  }

  return boots;
});