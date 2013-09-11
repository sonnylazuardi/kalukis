/**
 * This component has an authority in managing the steps needed
 * to paint an object on top of the canvas
 */
define(function(require){
  var fabric = require("fabric"),
      defineComponent = require("flight/lib/component"),
      withCanvasEvents = require("painters/withCanvasEvents"),
      withBrushPainter = require("painters/withBrushPainter"),
      withOutlinePainter = require("painters/withOutlinePainter");

  return defineComponent(Lukis, withCanvasEvents, withBrushPainter, withOutlinePainter);

  function Lukis(){

    this.defaultAttrs({
    /**
       * Canvas instance
       * @type {String}
       */
      canvas: "",
      /**
       * Canvas element
       * @type {String}
       */
      canvasEl: "",
      /**
       * Canvas configuration
       * @type {Object}
       */
      canvasCfg: {

      }
    });

    this.after("initialize", function(){
      this.constructCanvas();
      this.attachEventListeners();
    });

    this.constructCanvas = function(){
      this.attr.canvas = new fabric.Canvas(this.attr.canvasEl.replace(/(#|\.)/,''));

      this.trigger("canvasConstructed", {
        canvasEl: this.attr.canvasEl,
        canvas: this.attr.canvas
      });
    };

    this.attachEventListeners = function(){
      this.on("outlineShapePaintingReady", this.initOutlineShapePainting);
    };

    this.initOutlineShapePainting = function(){
      this.trigger("outlineShapePaintingInitted", {
        canvas: this.attr.canvas,
        canvasEventsService: {
          registerEventListeners: this.registerEventListeners,
          unregisterEventListerns: this.unregisterEventListerns
        }
      });
    };

  }
});