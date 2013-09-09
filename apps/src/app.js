/**
 * I'm alive
 */
define(function(require){

  var lukis = require("painters/lukis"),
      paintWidgets = require("ui/paintWidget/paintWidgets"),
      brushManager = require("brushServices/brushManager"),
      outlineManager = require("outlineServices/outlineManager"),
      brushlist = require("dataServices/brushList"),
      paintWidgetList = require("dataServices/paintWidgetList");

  function Application(){}

  Application.prototype.start = function() {
    /**
     * Any components that needs to hold a reference
     * to canvas instance and canvas element, should be
     * placed in this upper block, before the `lukis`
     * component is instantiated
     */
    paintWidgets.attachTo("#left-navigation");

    brushManager.attachTo(document);
    outlineManager.attachTo(document);

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
    brushlist.attachTo(document);
    paintWidgetList.attachTo(document);
  };

  return Application;
});