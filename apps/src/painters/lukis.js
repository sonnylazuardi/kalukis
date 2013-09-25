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
      withFreehandPainter = require("painters/withFreehandPainter"),
      withImagePainter = require("painters/withImagePainter");

  return defineComponent(Lukis, withCanvasEvents, withBrushPainter, withOutlinePainter, withFreehandPainter, withImagePainter);

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

      },

      /**
       * Custom event handlers for events related to this module
       * @type {Array}
       */
      customHandlers: {}
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

      this.on("outlineShapePaintingFinished", function(e, data){
        if (this.attr.customHandlers.outlineShapePaintingFinished) {
          var handler = this.attr.customHandlers.outlineShapePaintingFinished;

          // custom handler lives once only
          delete this.attr.customHandlers["outlineShapePaintingFinished"];

          handler.call(this, this.attr.canvas, data);
        } else {
          this.initBrushPainting(data);
        }
      }.bind(this));
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

      // if a customHandler is provided, than we need to call this handler
      // later
      if (data.customHandler){
        var key = Object.keys(data.customHandler)[0];
        this.attr.customHandlers[key] = data.customHandler[key];
      }

      this.prepareOutlineShapePainting(this.attr.canvas, {
        registerEventListeners: this.registerEventListeners,
        unregisterExistingListeners: this.unregisterExistingListeners
      }, data.outlineShape || null);
    };

    // TODO should this provide a way for customHandler to be registered
    this.initBrushPainting = function(data){
      this.prepareBrushPainting(this.attr.canvas, {
          registerEventListeners: this.registerEventListeners,
          unregisterEventListerns: this.unregisterEventListerns
        },
        data.outlineShape.getOutlinePoints(this.attr.activeBrush.brush.get('width'))
      );
    };

  }
});