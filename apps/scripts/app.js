/**
 * I'm alive
 */
define(function(require){

  var lukis = require("lukis"),
      pencil = require("ui/pencil"),
      linePaintShape = require("ui/linePaintShape"),
      rectBrush = require("ui/rectBrush"),
      circlePaintShape = require("ui/circlePaintShape"),
      imageButton = require("ui/imageButton"),
      removeButton = require("ui/removeButton"),
      loadingIndicator = require("ui/loadingIndicator"),
      brushesCombo = require("ui/brushescombo"),
      brushesList = require("data/brusheslist"),
      colorPicker = require("ui/colorpicker");

  function boots(){
    // attach modules
    lukis.attachTo("#lukis");

    pencil.attachTo("#pencil");
    linePaintShape.attachTo("#linePaintShape");
    rectBrush.attachTo("#rectBrush");
    circlePaintShape.attachTo("#circlePaintShape");
    imageButton.attachTo("#imageButton");
    removeButton.attachTo("#removeButton");

    loadingIndicator.attachTo("#loading-indicator");

    brushesList.attachTo(document);
    brushesCombo.attachTo("#brushescombo");
    colorPicker.attachTo("#colorpicker");
  }

  return {
    boots: boots
  };
});