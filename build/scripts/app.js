/**
 * I'm alive
 */
define(function(require){

  var lukis = require("lukis"),
      pencil = require("ui/pencil"),
      brushesCombo = require("ui/brushescombo"),
      colorPicker = require("ui/colorpicker"),
      brushesList = require("data/brusheslist");

  function boots(){
    // attach modules
    lukis.attachTo("#lukis");
    pencil.attachTo("#pencil");
    brushesList.attachTo(document);
    brushesCombo.attachTo("#brushescombo");
    colorPicker.attachTo("#colorpicker");
  }

  return {
    boots: boots
  };
});