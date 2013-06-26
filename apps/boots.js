define(

[
  "lukis",
  "ui/pencil",
  "ui/brushescombo",
  "ui/colorpicker",
  "data/brusheslist",
],

function(Lukis, Pencil, BrushesCombo, ColorPicker, BrushesList){

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
    ColorPicker.attachTo("#colorpicker", {
      canvasEl: "#lukis"
    });
  }

  return boots;
});