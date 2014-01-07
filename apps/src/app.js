/**
 * I'm alive
 */
define(function(require){

  var canvas = require("services/canvas"),
  
      brushPainter = require("painters/brushPainter"),
      freehandPainter = require("painters/freehandPainter"),
      imagePainter = require("painters/imagePainter"),

      paintWidgets = require("ui/paintWidget/paintWidgets"),
      canvasManipulationWidget = require("ui/canvasManipulationWidget/canvasManipulationWidget"),
      brushSizeWidget = require("ui/brushSizeWidget/brushSizeWidget"),
      brushDistanceWidget = require("ui/brushDistanceWidget/brushDistanceWidget"),
      brushSensitivityWidget = require("ui/brushSensitivityWidget/brushSensitivityWidget"),
      imageCanvasWidget = require("ui/imageCanvasWidget/imageCanvasWidget"),
      freehandWidget = require("ui/freehandWidget/freehandWidget"),
      colorWidget = require("ui/colorWidget/colorWidget"),
      brushPanelWidget = require("ui/brushPanel/brushPanel"),

      notification = require("ui/notification/notification"),
      keyHandler = require("ui/keyHandler/keyHandler"),

      brushManager = require("services/brushManager"),
      outlineManager = require("services/outlineManager"),

      cleaningService = require("services/canvasServices/cleaner"),

      imageCanvas = require("images/imageCanvas"),

      brushList = require("data/brushList"),
      paintWidgetList = require("data/paintWidgetList"),
      canvasManipulationList = require("data/canvasManipulationList");

  function Application(){
    // application wide error handling
    requirejs.onError = function(err) {
      console.log(err);
    };
  }

  Application.prototype.start = function() {
    /**
     * Any components that needs to hold a reference
     * to canvas instance and canvas element, should be
     * placed in this upper block, before the `lukis`
     * component is instantiated
     */
    freehandWidget.attachTo(".left-navigation");
    paintWidgets.attachTo(".left-navigation");
    imageCanvasWidget.attachTo(".left-navigation");
    canvasManipulationWidget.attachTo(".left-navigation");

    brushSizeWidget.attachTo("#sizerange");
    brushDistanceWidget.attachTo("#brushdistance");
    brushSensitivityWidget.attachTo("#brushsensitivity");
    colorWidget.attachTo("#colorpicker");
    brushPanelWidget.attachTo("#brushes");
    notification.attachTo("#status-bar");
    
    keyHandler.attachTo(document);

    brushManager.attachTo(document);
    outlineManager.attachTo(document);

    cleaningService.attachTo(document);

    imageCanvas.attachTo(document);

    /**
     * The lukis component will publish the canvas instance
     * and its DOM element with an event name of `canvasConstructed`.
     */
    brushPainter.attachTo(document);
    freehandPainter.attachTo(document);
    imagePainter.attachTo(document);

    /**
     * Components that hold data should be instantiated here.
     * It should publish an update on its data once its is
     * instantiated
     */
    brushList.attachTo(document);
    paintWidgetList.attachTo(document);
    canvasManipulationList.attachTo(document);
    
    canvas.attachTo(document, {
      id: "lukis",
      canvasAttrs: {
        backgroundColor: "#ECF0F1",
        interactive: true,
        selection: true  
      }
    });
  };

  return Application;
});