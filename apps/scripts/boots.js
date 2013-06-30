/**
 * I'm alive
 */
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
    Lukis.attachTo("#lukis");
    Pencil.attachTo("#pencil");
    BrushesList.attachTo(document);
    BrushesCombo.attachTo("#brushescombo");
    ColorPicker.attachTo("#colorpicker");
  }

  return boots;
});