/**
 * I'm alive
 */
define(function(require){

  var lukis = require("lukis"),
      pencil = require("ui/pencil"),
      rectBrush = require("ui/rectBrush"),
      circleShapedBrush = require("ui/circleShapedBrush"),
      imageButton = require("ui/imageButton"),
      loadingIndicator = require("ui/loadingIndicator"),
      brushesCombo = require("ui/brushescombo"),
      brushesList = require("data/brusheslist"),
      colorPicker = require("ui/colorpicker");

  function boots(){
    // attach modules
    lukis.attachTo("#lukis");

    pencil.attachTo("#pencil");
    rectBrush.attachTo("#rectBrush");
    circleShapedBrush.attachTo("#circleShapedBrush");
    imageButton.attachTo("#imageButton");
    loadingIndicator.attachTo("#loading-indicator");

    brushesList.attachTo(document);
    brushesCombo.attachTo("#brushescombo");
    colorPicker.attachTo("#colorpicker");
  }

  return {
    boots: boots
  };
});