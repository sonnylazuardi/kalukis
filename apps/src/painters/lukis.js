/**
 * I have the authority to manage the steps needed
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

    /**
     * Initialize the canvas instance. Once it's done, publish the canvas
     * element and instance on canvasConstructod event
     */
    this.constructCanvas = function(){
      this.attr.canvas = new fabric.Canvas(this.attr.canvasEl.replace(/(#|\.)/,''));

      this.trigger("canvasConstructed", {
        canvasEl: this.attr.canvasEl,
        canvas: this.attr.canvas
      });
    };

    this.attachEventListeners = function(){
      this.on("cancelPaintingRequested", function(e, data){
        this.cancelCurrentPainting();
      }.bind(this));

      this.on("paintWidgetClicked", function(e, data){
        this.publishActiveOutlineChange(data.paintWidgetId);
      }.bind(this));

      this.on("outlineShapePaintingFinished", function(e, data){
        // allowing a custom handler
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

    this.publishActiveOutlineChange = function(id){
      this.on("activeOutlineShapeUpdated", function(e, data){
        this.off("activeOutlineShapeUpdated");
        this.initOutlineShapePainting(data);
      }.bind(this));

      this.trigger("activeOutlineShapeChanged", {
        activeOutlineShapeId: id
      });
    };

    /**
     * Cancel current painting
     */
    this.cancelCurrentPainting = function(){
      this.unregisterExistingListeners(this.attr.canvas);
      this.attr.customHandlers = {};
    };

    /**
     * Start painting outline.
     *
     * The `data` contains:
     * + customHandler  : a custom handler for any event that might be published by the outline painter
     * + activeOutlineShape: the outline shape to use
     * 
     * @param  {Object} data Data need to paint
     */
    this.initOutlineShapePainting = function(data){
      this.cancelCurrentPainting();

      // if a customHandler is provided, than we need to call this handler
      // later
      if (data.customHandler){
        var key = Object.keys(data.customHandler)[0];
        this.attr.customHandlers[key] = data.customHandler[key];
      }

      // calls method from withOutlineShapePainter
      this.prepareOutlineShapePainting(this.attr.canvas, {
        registerEventListeners: this.registerEventListeners,
        unregisterExistingListeners: this.unregisterExistingListeners
      });
    };

    /**
     * Start painting the brush.
     *
     * The `data` contains:
     * + customHandler  : a custom handler for any event that might be published by the brush painter
     * + outlineShapeId : the outline shape id
     * + outlineShape   : the outline shape instance
     * 
     * @param  {Object} data Data need to paint
     */
    this.initBrushPainting = function(data){
      if (data.customHandler){
        var key = Object.keys(data.customHandler)[0];
        this.attr.customHandlers[key] = data.customHandler[key];
      }
      // calls method from withBrushPainter
      this.prepareBrushPainting(this.attr.canvas, {
          registerEventListeners: this.registerEventListeners,
          unregisterEventListerns: this.unregisterEventListerns
        },
        data.outlineShape.getOutlinePoints(this.attr.activeBrush.brush.get('width'))
      );
    };

  }
});