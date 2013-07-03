/**
 * I'm alive
 */
define(function(require){

  var lukis = require("lukis"),
      pencil = require("ui/pencil"),
      shapeBrush = require("ui/shapeBrush"),
      brushesCombo = require("ui/brushescombo"),
      brushesList = require("data/brusheslist"),
      colorPicker = require("ui/colorpicker");

  function boots(){
    // attach modules
    lukis.attachTo("#lukis");

    pencil.attachTo("#pencil");
    shapeBrush.attachTo("#shapeBrush");

    brushesList.attachTo(document);
    brushesCombo.attachTo("#brushescombo");
    colorPicker.attachTo("#colorpicker");
  }

  return {
    boots: boots
  };
});