/**
 * I'm alive
 */
define(function(require){

  var canvas = require("services/canvas"),
      lukis = require("painters/lukis"),

      paintWidgets = require("ui/paintWidget/paintWidgets"),
      canvasManipulationWidget = require("ui/canvasManipulationWidget/canvasManipulationWidget"),
      brushListWidget = require("ui/brushListWidget/brushListWidget"),
      brushSizeWidget = require("ui/brushSizeWidget/brushSizeWidget"),
      imageCanvasWidget = require("ui/imageCanvasWidget/imageCanvasWidget"),
      freehandWidget = require("ui/freehandWidget/freehandWidget"),
      colorWidget = require("ui/colorWidget/colorWidget"),

      brushManager = require("services/brushManager"),
      outlineManager = require("services/outlineManager"),

      cleaningService = require("canvasServices/cleaner"),

      imageCanvas = require("images/imageCanvas"),

      brushList = require("dataServices/brushList"),
      paintWidgetList = require("dataServices/paintWidgetList"),
      canvasManipulationList = require("dataServices/canvasManipulationList");

  function Application(){}

  Application.prototype.start = function() {
    canvas.attachTo(document, {
      id: "lukis"
    });
    /**
     * Any components that needs to hold a reference
     * to canvas instance and canvas element, should be
     * placed in this upper block, before the `lukis`
     * component is instantiated
     */
    freehandWidget.attachTo(".left-navigation");
    paintWidgets.attachTo(".left-navigation");
    canvasManipulationWidget.attachTo(".left-navigation");
    imageCanvasWidget.attachTo(".left-navigation");
    brushListWidget.attachTo("#brushescombo");
    brushSizeWidget.attachTo("#sizerange");
    colorWidget.attachTo("#colorpicker");

    brushManager.attachTo(document);
    outlineManager.attachTo(document);

    cleaningService.attachTo(document);

    imageCanvas.attachTo(document);

    /**
     * The lukis component will publish the canvas instance
     * and its DOM element with an event name of `canvasConstructed`.
     */
    lukis.attachTo(document, {
      canvasEl: "#lukis"
    });

    /**
     * Components that hold data should be instantiated here.
     * It should publish an update on its data once its is
     * instantiated
     */
    brushList.attachTo(document);
    paintWidgetList.attachTo(document);
    canvasManipulationList.attachTo(document);
  };

  return Application;
});