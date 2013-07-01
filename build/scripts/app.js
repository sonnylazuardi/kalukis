/**
 * I'm alive
 */
define(function(require){

  var lukis = require("lukis"),
      pencil = require("ui/pencil"),
      brushesCombo = require("ui/brushescombo"),
      brushesList = require("data/brusheslist"),
      colorPicker = require("ui/colorpicker");

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