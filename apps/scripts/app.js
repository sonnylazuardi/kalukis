/**
 * I'm alive
 */
define(function(require){

  var Lukis = require("lukis"),
      Pencil = require("ui/pencil"),
      BrushesCombo = require("ui/brushescombo"),
      ColorPicker = require("ui/colorpicker"),
      BrushesList = require("data/brusheslist");

  function boots(){
    // attach modules
    Lukis.attachTo("#lukis");
    Pencil.attachTo("#pencil");
    BrushesList.attachTo(document);
    BrushesCombo.attachTo("#brushescombo");
    ColorPicker.attachTo("#colorpicker");
  }

  return {
    boots: boots
  };
});