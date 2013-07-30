/**
 * I'm alive
 */
define(function(require){

  var lukis = require("lukis"),
      pencil = require("ui/pencil"),
      linePaintShape = require("ui/linePaintShape"),
      rectPaintShape = require("ui/rectPaintShape"),
      circlePaintShape = require("ui/circlePaintShape"),
      imageButton = require("ui/imageButton"),
      removeButton = require("ui/removeButton"),
      clearButton = require("ui/clearButton"),
      loadingIndicator = require("ui/loadingIndicator"),
      brushesCombo = require("ui/brushesCombo"),
      brushesList = require("data/brusheslist"),
      colorPicker = require("ui/colorPicker"),
      sizeRange = require("ui/sizeRange");

  function boots(){
    // attach modules
    lukis.attachTo("#lukis");

    pencil.attachTo("#pencil");
    linePaintShape.attachTo("#linePaintShape");
    rectPaintShape.attachTo("#rectPaintShape");
    circlePaintShape.attachTo("#circlePaintShape");
    imageButton.attachTo("#imageButton");
    removeButton.attachTo("#removeButton");
    clearButton.attachTo("#clearButton");

    loadingIndicator.attachTo("#loading-indicator");

    brushesList.attachTo(document);
    brushesCombo.attachTo("#brushescombo");
    colorPicker.attachTo("#colorpicker");
    sizeRange.attachTo("#sizerange");
  }

  return {
    boots: boots
  };
});