/**
 * This component has an authority in managing the steps needed
 * to paint an object on top of the canvas
 */
define(function(require){
  var fabric = require("fabric"),
      defineComponent = require("flight/lib/component"),
      withCanvasEvents = require("painters/withCanvasEvents"),
      withBrushPainter = require("painters/withBrushPainter"),
      withOutlinePainter = require("painters/withOutlinePainter"),
      withFreehandPainter = require("painters/withFreehandPainter");

  return defineComponent(Lukis, withCanvasEvents, withBrushPainter, withOutlinePainter, withFreehandPainter);

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
      this.on("freehandPaintingReady", this.initFreehandPainting);
      this.on("outlineShapePaintingReady", this.initOutlineShapePainting);
      this.on("outlineShapePaintingFinished", this.initBrushPainting);
    };

    this.cancelCurrentPainting = function(){
      this.unregisterExistingListeners(this.attr.canvas);
      this.stopFreehandPainting();
    };

    this.initFreehandPainting = function(e, data){
      this.cancelCurrentPainting();
      this.startFreehandPainting(this.attr.canvas, this.attr.activeBrush.brush);
    };

    this.initOutlineShapePainting = function(e, data){
      this.cancelCurrentPainting();
      this.trigger("outlineShapePaintingInitted", {
        canvas: this.attr.canvas,
        canvasEventsService: {
          registerEventListeners: this.registerEventListeners,
          unregisterExistingListeners: this.unregisterExistingListeners
        }
      });
    };

    this.initBrushPainting = function(e, data){
      // TODO bagaimana caranya agar kita dapat memperoleh points

      this.trigger("brushPaintingInitted", {
        canvas: this.attr.canvas,
        canvasEventsService: {
          registerEventListeners: this.registerEventListeners,
          unregisterEventListerns: this.unregisterEventListerns
        },
        points: data.outlineShape.getOutlinePoints(this.attr.activeBrush.brush.get('width'))
      });
    };

  }
});